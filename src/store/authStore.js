import { create } from "zustand";
import { api } from "../services/api";

const useAuthStore = create((set) => ({
  username: null,
  isLoggedIn: false,
  authToken: localStorage.getItem("authToken") || null,
  isLoading: false,
  isError: false,

  // Login User
  login: async ({ email, password }) => {
    set({ isLoading: true });
    try {
      const { data, status } = await api.post(
        "/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (status === 200 && data) {
        const { token } = data;

        set({
          isLoading: false,
          isSuccess: true,
          isLoggedIn: true,
          user: { token },
        });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to authenticate user";
      throw new Error(errorMessage);
    }
  },

  register: async ({ username, email, password, confirm_password }) => {
    try {
      await api.post("/users/register", {
        username,
        email,
        password,
        confirm_password,
      });

      return true;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to register user";
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ authToken: null });
  },

  isAuthenticated: () => {
    return !!useAuthStore.getState().authToken;
  },
}));

export default useAuthStore;
