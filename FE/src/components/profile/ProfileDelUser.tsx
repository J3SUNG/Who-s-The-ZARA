import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { ProfileInputForm } from "./ProfileInputForm";
import useFormField from "../../hooks/useFormField";
import { deleteUser } from "../../api/users/usersApiCall";
import { toast } from "react-toastify";
import { removeAllToken } from "../../utils/cookie";
import { useIsLoginState } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";

const ProfileDelUser = () => {
  const passwordField = useFormField("");
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const { setIsLogin } = useIsLoginState();
  const navigate = useNavigate();

  const onDeleteUser = async () => {
    if (!confirmPasswordField.isValid) {
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    const result = await deleteUser(passwordField.value);
    // TODO: accessToken 만료시 재발급로직
    if (result) {
      removeAllToken();
      setIsLogin(false);
      navigate("/");
    }
  };
  return (
    <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[80px] text-[48px] font-bold bg-black flex flex-col justify-around">
      <ProfileInputForm text="비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
      <ProfileInputForm
        text="비밀번호 확인"
        handleChange={confirmPasswordField.onChange}
        value={confirmPasswordField.value}
      />

      <div
        className="absolute  cursor-pointer w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px] text-[56px]"
        onClick={onDeleteUser}
      >
        <img src={yellowBtnImg} className="absolute " />
        <p className="absolute font-bold text-red-600">탈퇴 하기</p>
      </div>
    </div>
  );
};
export default ProfileDelUser;