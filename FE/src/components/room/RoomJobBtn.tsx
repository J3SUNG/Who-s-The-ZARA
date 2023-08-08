import { useEffect, useState } from "react";
import { JobSetting } from "../../types/RoomSettingType";
import { useWebSocket } from "../../context/socketContext";
import stompUrl from "../../api/url/stompUrl";
import { useParams } from "react-router-dom";
import { PubJobSetting } from "../../types/StompRoomPubType";

interface RoomJobBtnProps {
  id: number;
  img: string;
  isUsedInitial: boolean;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
  jobSetting: JobSetting;
}

const RoomJobBtn = ({ img, id, isUsedInitial, setJobSetting, jobSetting }: RoomJobBtnProps) => {
  const { roomCode } = useParams();
  const { client } = useWebSocket();
  const [isUsed, setIsUsed] = useState(isUsedInitial);
  const onToggleSelected = () => {
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    setJobSetting((prev) => ({ ...prev, [id.toString()]: isUsed }));
  }, [isUsed]);

  useEffect(() => {
    if (!roomCode) return;
    const url = stompUrl.pubRoomJobSetting(roomCode);
    const body: PubJobSetting = {
      data: jobSetting,
    };
    client?.publish({
      destination: url,
      body: JSON.stringify(body),
    });
  }, [jobSetting]);

  return (
    <div
      className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${!isUsed && "opacity-40"} cursor-pointer`} src={img} />
    </div>
  );
};

export default RoomJobBtn;
