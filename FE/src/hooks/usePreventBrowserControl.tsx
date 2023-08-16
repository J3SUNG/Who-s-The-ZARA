import { useEffect } from "react";
import { toast } from "react-toastify";

export const usePreventBrowserControl = () => {
  useEffect(() => {
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const preventGoBack = () => {
      history.pushState(null, "", location.href);
      toast.error("게임 중에는 뒤로 가기를 할 수 없습니다.");
    };

    window.addEventListener("beforeunload", preventClose);
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("beforeunload", preventClose);
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
};
