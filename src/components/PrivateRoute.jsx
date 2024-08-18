import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ Component }) {
  const { isAuthenicated } = useContext(AuthContext);

  console.log(isAuthenicated);

  return isAuthenicated ? <Component /> : <Navigate to="/login" />;
}
