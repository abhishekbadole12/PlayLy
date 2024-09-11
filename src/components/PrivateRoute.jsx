import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ auth }) {
  return auth ? <Outlet /> : <Navigate to="/login" replace />
}
