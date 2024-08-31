import { decodeToken } from "../services/auth";
import useAuthStore from "../store/authStore";

export const useIsAdmin = () => {
  const { authToken } = useAuthStore();

  if (!authToken) return null;

  const decodedToken = decodeToken(authToken);

  return decodedToken?.isAdmin;
};
