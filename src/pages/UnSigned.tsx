import Modal from "@styles/modal";
import { useState } from "react";
import Signin from "./Signin";
import SignUp from "./SignUp";

const UnSigned = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);
  const [isSigninOpen, setIsSigninOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-row gap-4">
      <Modal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen}>
        <SignUp setIsOpen={setIsSignUpOpen} />
      </Modal>
      <Modal isOpen={isSigninOpen} setIsOpen={setIsSigninOpen}>
        <Signin setIsOpen={setIsSigninOpen} />
      </Modal>
      <button
        className="p-4 border"
        onClick={() => {
          setIsSignUpOpen(true);
        }}
      >
        회원가입
      </button>
      <button
        onClick={() => {
          setIsSigninOpen(true);
        }}
        className="p-4 border"
      >
        로그인
      </button>
    </div>
  );
};

export default UnSigned;
