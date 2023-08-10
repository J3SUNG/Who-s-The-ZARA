package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.*;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.service.*;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.security.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompRoomController {
    // todo : jobsetting
    private final RedisPublisher redisPublisher;
    private final StompRoomService stompRoomService;
    private final TokenService tokenService;
    private final RoomService roomService;
    private final RoomEnterInfoRedisService roomEnterInfoRedisService;
    private final RoomJobSettingRedisService roomJobSettingRedisService;
    private final UserRepository userRepository;


    // ws 프로토콜로 사용한 "/pub/chat/enter"과 매칭
    @Operation(summary = "[ENTER] 방 입장")
    @MessageMapping(value = "/room/{roomCode}/enter")
    public void enter(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("ENTER 시작");
        // room, user 추출
        String processedToken = token.replace("Bearer ", "");
        User user = tokenService.getUserFromToken(processedToken);
        Room room = roomService.findRoomByCode(roomCode);
        // 토픽 등록
        stompRoomService.setRoomTopic(roomCode);
        // ENTER 메세지 보내기
        DataDTO dataDTO = DataDTO.builder()
                .type("ENTER_MESSAGE")
                .roomCode(roomCode)
                .data(user.getNickname() +"님이 채팅방에 입장하셨습니다.")
                .build();
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        // 유저 정보 저장
        roomEnterInfoRedisService.enterUser(roomCode, user);
        // CurrentSeatDTO 추출
        List<CurrentSeatsDTO> currentSeatsDTOs = roomEnterInfoRedisService.getUserEnterInfo(roomCode);
        log.info("현재 유저 수 : " + roomEnterInfoRedisService.getUsingSeats(roomCode));
        // jobSetting 추출
        List<Long> excludeJobSetting = roomJobSettingRedisService.findExcludeJobSeqByGameCode(roomCode); // todo : gameCode, roomCode 둘 다로 jobSetting key 생성
        Map<Long, Boolean> jobSetting = new HashMap<>();
        for (long i = 1; i <= 7; i++) {
            jobSetting.put(i, true);
        }
        for (Long ex : excludeJobSetting) {
            jobSetting.put(ex, false);
        }
        // INITIAL_ROOM_SETTING 보내기
        RoomSettingDTO roomSettingDTO = RoomSettingDTO
                .builder()
                .title(room.getTitle())
                .ownerSeq(room.getOwner().getUserSeq())
                .jobSetting(jobSetting)
                .curSeats(currentSeatsDTOs)
                .build();
        dataDTO.setType("ENTER_ROOM_SETTING");
        dataDTO.setData(roomSettingDTO);
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        log.info("ENTER 끝");
    }

    @Operation(summary = "[CHAT] 채팅 메세지")
    @MessageMapping(value = "/room/{roomCode}/chat")
    public void chat(@DestinationVariable String roomCode, ChatMessageDTO chatMessageDTO) {
        log.info("CHAT 시작");
        stompRoomService.setRoomTopic(roomCode);
        chatMessageDTO.setNickname(userRepository.findNicknameByUserSeq(chatMessageDTO.getSenderSeq()));
        DataDTO dataDTO = DataDTO.builder()
                .type("CHAT")
                .roomCode(roomCode)
                .data(chatMessageDTO)
                .build();
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        log.info("CHAT 끝");
    }

    @Operation(summary = "[EXIT] 방 퇴장")
    @MessageMapping(value = "/room/{roomCode}/exit")
    public void exit(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("EXIT 시작");
        stompRoomService.setRoomTopic(roomCode);
        String processedToken = token.replace("Bearer ", "");
        User user = tokenService.getUserFromToken(processedToken);
        // 유저 관리
        roomEnterInfoRedisService.setUserExitInfo(roomCode, user.getUserSeq());
        // 메세지 보내기
        DataDTO dataDTO = DataDTO.builder()
                .type("EXIT")
                .roomCode(roomCode)
                .data(user.getNickname() +"님이 채팅방에 퇴장하셨습니다.")
                .build();
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        // todo : 방장인 경우 changeowner
        Room room = roomService.findRoomByCode(roomCode);
//        room.getOwner().getUserSeq()
        log.info("EXIT 끝");
    }

    @Operation(summary = "[SET] 방 제목 세팅")
    @MessageMapping(value = "/room/{roomCode}/title")
    public void setTitle(@DestinationVariable String roomCode, RoomSettingDTO roomSettingDTO) {
        log.info("TITLE 시작");
        stompRoomService.setRoomTopic(roomCode);
        DataDTO dataDTO = DataDTO.builder()
                .type("TITLE")
                .roomCode(roomCode)
                .data(roomSettingDTO.getTitle())
                .build();
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        log.info("TITLE 끝");
    }

//    @Operation(summary = "[JOB SETTING] 방 제목 세팅")
//    @MessageMapping(value = "/room/{roomCode}/jobSetting")
//    public void setTitle(@DestinationVariable String roomCode, JobSettingDTO jobSettingDTO) {
//        log.info("JOB SETTING 시작");
//        stompRoomService.setRoomTopic(roomCode);
//
//        DataDTO dataDTO = DataDTO.builder()
//                .type("JOB_SETTING")
//                .roomCode(roomCode)
//                .data(jobSettingDTO)
//                .build();
//        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
//        log.info("JOB SETTING 끝");
//    }

    @Operation(summary = "[START] 게임 시작")
    @MessageMapping(value = "/room/{roomCode}/start")
    public void startGame(@DestinationVariable String roomCode) {
        log.info("START 시작");
        // todo : 방장인지 확인
        stompRoomService.setRoomTopic(roomCode);
        String gameCode = stompRoomService.generateGameCode(roomCode);
        DataDTO dataDTO = DataDTO.builder()
                .type("START")
                .roomCode(roomCode)
                .data(gameCode)
                .build();
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        log.info("START 끝");
    }
}
