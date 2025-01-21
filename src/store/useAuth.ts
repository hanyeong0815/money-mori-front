import ContextCallbackOption from "@models/common/ContextCallbackOption";
import loginRes from "@models/user/LoginDto";
import STORAGE_KEY from "@utils/storage-key";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  nickname: string | null;
  signUp: (option?: ContextCallbackOption) => void;
  login: (loginRes: Partial<loginRes>, option?: ContextCallbackOption) => void;
  logout: (callback?: () => void) => void;
}

const useAuth = create<AuthState>((set, get) => {
  const AUTHUSER = STORAGE_KEY.AUTHUSER;

  return {
    isAuthenticated: localStorage.getItem(AUTHUSER) != null,
    username: localStorage.getItem(AUTHUSER) ?? null,
    nickname: localStorage.getItem("nickname") ?? null,

    signUp: (option) => {},

    login: (loginRes, option) => {
      localStorage.setItem(AUTHUSER, loginRes.username!);
      localStorage.setItem("nickname", loginRes.nickname!);
      localStorage.setItem("accessToken", loginRes.tokenPair?.accessToken!);
      localStorage.setItem("refreshToken", loginRes.tokenPair?.refreshToken!);

      set({
        nickname: loginRes.nickname,
        isAuthenticated: true,
      });

      window.location.href = `/${loginRes.username}`;
    },

    logout: (callback) => {},
  };
});

export default useAuth;
