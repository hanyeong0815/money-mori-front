import Home from "@/pages/Home";
import PATH from "@utils/path"
import { Navigate, Route, Routes } from "react-router-dom"

const { HOME } = PATH;

const ProtectedRoutes = () => {
  return (
    <Routes>
        <Route path=":memberId" element={<Home />} />
        <Route path="*" element={<Navigate replace to={HOME} />} />
    </Routes>
  )
}

export default ProtectedRoutes