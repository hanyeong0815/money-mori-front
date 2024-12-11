import ContextCallbackOption from "@models/common/ContextCallbackOption";
import User from "@models/user/User";
import STORAGE_KEY from "@utils/storage-key";
import { resolve } from "path";
import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    nickname: string | null;
    signUp: (option?: ContextCallbackOption) => void;
    login: (option?: ContextCallbackOption) => void;
    logout: (callback?: () => void) => void;
}

const useAuth = create<AuthState>((set, get) => {
    const AUTHUSER = STORAGE_KEY.AUTHUSER;

    return {
        isAuthenticated: localStorage.getItem(AUTHUSER) != null,
        nickname: localStorage.getItem(AUTHUSER),

        signUp: (option) => {

        },

        login: (option) => {
            type T = {data: Partial<User> };

            const loginPromise = new Promise<T>((resolve, reject) => {
                const response = { data: { username: "abc123", nickname: "테스터" } };
                resolve(response);
            });

            loginPromise
                .then(({ data }) => data)
                .then((user) => {
                    if (!user) {
                        set({ isAuthenticated: false });
                        return;
                    }

                    localStorage.setItem(AUTHUSER, JSON.stringify(user.nickname));

                    set({ isAuthenticated:true, nickname: user.nickname });
                })
                .catch(!!option?.onCatch ? option.onCatch : console.error);
        },

        logout: (callback) => {
            
        },
    };
});

export default useAuth;