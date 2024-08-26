import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function PrivateRoute({ component: Component }) {
  const { authToken } = useAuthStore();

  return authToken ? <Component /> : <Navigate to="/login" />;
}
