import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ auth }) {
  console.log(auth);

  return (auth === true ? <Outlet /> : <Navigate to="/login" replace />)
}
