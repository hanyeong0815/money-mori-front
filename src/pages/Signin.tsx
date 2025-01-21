import loginRes from "@models/user/LoginDto";
import loginDto from "@models/user/LoginDto";
import useAuth from "@store/useAuth";
import axios from "axios";
import {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface SigninProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin: FC<SigninProps> = (props) => {
  const { setIsOpen } = props;
  const { login } = useAuth();

  const [loginValidate, setLoginValidate] = useState<boolean>(false);

  const idRef = useRef<HTMLInputElement | null>(null);
  const pwRef = useRef<HTMLInputElement | null>(null);

  const pressEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      submit();
    }
  };

  const submit = useCallback(() => {
    setLoginValidate(false);

    const username = idRef.current?.value;
    const password = pwRef.current?.value;

    if (!username || !password) {
      setLoginValidate(true);
      return;
    }

    const url = "http://localhost:8000/api/member/login";

    axios
      .post(url, { username, password })
      .then(({ data }) => data)
      .then((loginRes: loginRes) => {
        if (!!loginRes) {
          login(loginRes);
          setIsOpen(false);
        }
      })
      .catch((err) => {
        setLoginValidate(true);
      });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", pressEsc);
    return () => document.removeEventListener("keydown", pressEsc);
  }, []);

  return (
    <div className="relative flex flex-col gap-4 h-full p-4 justify-center">
      <fieldset className="border-2 h-full p-4 rounded-md relative">
        <legend className="text-6xl font-bold px-2">LOGIN</legend>
        <div className="flex flex-row w-full h-full justify-center items-center">
          <div className="flex flex-col gap-4 p-4 w-[60%]">
            {loginValidate && (
              <h1 className="text-red-500 text-2xl font-bold">
                ID 또는 패스워드를 다시 확인해주세요!
              </h1>
            )}
            <div className="w-full scrollbar-hide items-center">
              <input
                type="text"
                ref={idRef}
                spellCheck={false}
                placeholder="ID"
                className="border-2 rounded-md p-2 text-3xl w-full"
              />
            </div>
            <div className="w-full scrollbar-hide items-center">
              <input
                type="password"
                ref={pwRef}
                required={true}
                spellCheck={false}
                placeholder="PW"
                className={`border-2 rounded-md p-2 text-3xl w-full`}
              />
            </div>
          </div>
          <div className="flex w-[40%] justify-center items-center h-[40%] px-2">
            <button
              onClick={submit}
              className="border-4 border-green-500 w-[80%] h-full rounded-lg text-4xl font-bold bg-green-400"
            >
              로그인
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Signin;
