import axios from "axios";
import { FunctionComponent as FC, useCallback, useRef, useState } from "react";

interface SignUpProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp:FC<SignUpProps> = ({setIsOpen}) => {
	const defaultTextBoxStyle = "w-full h-9 border-2 rounded-md px-2";

	const [passwordSwitch, setPasswordSwitch] = useState<boolean | null>(null);
	const [backEmailActivate, setBackEmailActivate] = useState<boolean>(true);
  const [backEmailValue, setBackEmailValue] = useState<string>("");
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
	const [passwordCheckErrorSwitch, setPasswordCheckErrorSwitch] = useState<
    boolean | null
  >(null);

	const idRef = useRef<HTMLInputElement | null>(null);
	const pwRef = useRef<HTMLInputElement | null>(null);
	const frontEmailRef = useRef<HTMLInputElement | null>(null);
	const backEmailRef = useRef<HTMLInputElement | null>(null);
	const selectBackEmailRef = useRef<HTMLSelectElement | null>(null);

	// function area
  const selectedValue = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectBackEmailRef.current?.value !== "self") {
      setBackEmailActivate(true);
    } else if (selectBackEmailRef.current.value === "self") {
      setBackEmailActivate(false);
    }

    if (evt.target.value === "select" || evt.target.value === "self") {
      setBackEmailValue("");
    } else {
      setBackEmailValue(evt.target.value);
    }
  };

	const passwordCheckFocusOut = (
    evt: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (passwordSwitch) {
      setPasswordErrorMessage("비밀번호를 확인해주세요.");
      setPasswordCheckErrorSwitch(true);
    } else if (pwRef.current?.value !== evt.target.value) {
      setPasswordErrorMessage("패스워드가 일치하지 않습니다.");
      setPasswordCheckErrorSwitch(true);
    } else if (pwRef.current?.value === evt.target.value) {
      setPasswordCheckErrorSwitch(false);
    }
  };

	const certify = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    const id = idRef.current?.value;
		const pw = pwRef.current?.value;
		const email = frontEmailRef.current?.value + "@" + backEmailRef.current?.value;

		const url = "http://localhost:8000/api/member";

		axios.post(
			url,
			{
				username: id,
				password: pw,
				email
			}
		).then(({ data }) => data)
		.then((response) => {
			console.log(response);
		})
  }, []);

  return (
    <div className="relative flex flex-col gap-4 h-full p-4 justify-center">
			<fieldset className="border-2 h-full p-4 rounded-md relative">
        <legend className="text-6xl font-bold px-2">회원가입</legend>
				<div className="flex flex-row w-full h-full justify-center items-center">
					<div className="flex flex-col gap-4 p-4 w-[60%]">
							<div className="grid grid-cols-threeSeven gap-3 scrollbar-hide items-center">
									<p className="text-3xl font-bold">ID</p>
									<input type="text" ref={idRef} className="border-2 rounded-md p-2 text-3xl" />
							</div>
							<div className="grid grid-cols-threeSeven gap-3 scrollbar-hide items-center">
								<p className="text-3xl font-bold">PW</p>
								<input type="password"
									ref={pwRef}
									required={true}
									onBlur={(evt) => {
										if (evt.target.value === "") return;

										const passwordExp = /[A-Za-z\d$@$!%*#?&]/g;
										const passwordRange = /^.{10,}$/;
										if (passwordExp.test(evt.target.value)) {
											setPasswordSwitch(false);
										} else {
											setPasswordSwitch(true);
										}
										if (!passwordRange.test(evt.target.value)) {
											setPasswordSwitch(true);
										}
									}}
									spellCheck={false}
									className={`border-2 rounded-md p-2 text-3xl 
										${
										passwordSwitch !== null
											? passwordSwitch
												? "border-red-600"
												: "border-green-400"
											: ""
									}`}
								/>
							</div>
							<div className="grid grid-cols-threeSeven gap-3 scrollbar-hide items-center">
								<p className="text-xl font-bold">PWChk</p>
								<input type="password" ref={pwRef}
                  onBlur={passwordCheckFocusOut} className={`border-2 rounded-md p-2 text-3xl
										${
                    passwordCheckErrorSwitch !== null
                      ? passwordCheckErrorSwitch
                        ? "border-red-600"
                        : "border-green-400"
                      : ""
                  }`} />
							</div>
							<div className="grid grid-cols-threeSeven gap-3 scrollbar-hide items-center">
								<p className="text-2xl font-bold">email</p>
								<div className="flex flex-row items-center gap-2">
									<input type="text" ref={frontEmailRef} className="border-2 rounded-md p-2 text-2xl" />
									<span className="font-bold text-3xl">@</span>
									<div className="flex flex-row gap-2 w-full">
										<input
											type="text"
											ref={backEmailRef}
											value={backEmailValue}
											disabled={backEmailActivate}
											onChange={(e) => {
												setBackEmailValue(e.target.value);
											}}
											className={`${defaultTextBoxStyle} w-full text-xl p-2 ${
												backEmailActivate ? "bg-gray-200" : ""
											}`}
											spellCheck={false}
										/>
										<select
											ref={selectBackEmailRef}
											onChange={selectedValue}
											className="w-32 border-2 rounded-md px-2"
										>
											<option value="select">선택하기</option>
											<option value="naver.com">네이버</option>
											<option value="gmail.com">구글</option>
											<option value="kakao.com">카카오</option>
											<option value="self">직접입력</option>
										</select>
									</div>
								</div>
							</div>
					</div>
					<div className="flex w-[40%] justify-center items-center h-[60%] px-2">
						<button onClick={certify} className="border-4 border-green-500 w-[80%] h-full rounded-lg text-4xl font-bold bg-green-400">
							회원가입
						</button>
					</div>
				</div>
			</fieldset>
    </div>
  )
}

export default SignUp