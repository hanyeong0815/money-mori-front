import UnSigned from "@/pages/UnSigned"
import { Navigate, Route, Routes } from "react-router-dom"

const UnprotectedRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UnSigned />} />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default UnprotectedRoutes