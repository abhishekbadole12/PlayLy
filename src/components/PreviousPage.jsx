import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Login from "../pages/Auth/Login";

export default function RedirectToPreviousPage() {
    const location = useLocation();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const from = location.state?.from?.pathname || '/';

    return isAuthenticated() ? <Navigate to={from} replace /> : <Login />;
}