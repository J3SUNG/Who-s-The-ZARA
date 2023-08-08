export default {
  subRoom: (roomCode: string) => `/sub/room/${roomCode}`,
  pubChat: (roomCode: string) => `/pub/room/${roomCode}/chat`,
  pubRoomTitle: (roomCode: string) => `/pub/room/${roomCode}/title`,
  pubRoomJobSetting: (roomCode: string) => `/pub/room/${roomCode}/jobSetting`,
  pubRoomStart: (roomCode: string) => `/pub/room/${roomCode}/start`,
  subGame: (gameCode: string) => `/sub/game/${gameCode}/all`,
  // publishEnterMessage: () => `/pub/chat/enter`,

  pubGameTimer: (gameCode: string) => `/pub/game/${gameCode}/timer`,
};
