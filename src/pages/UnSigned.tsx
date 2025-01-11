import Modal from "@styles/modal"
import { useState } from "react"
import SignUp from "./SignUp";

const UnSigned = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-row gap-4">
      <Modal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen}>
        <SignUp setIsOpen={setIsSignUpOpen} />
      </Modal>
      <button className="p-4 border" onClick={() => {setIsSignUpOpen(true)}}>회원가입</button>
      <button className="p-4 border">로그인</button>
    </div>
  )
}

export default UnSigned