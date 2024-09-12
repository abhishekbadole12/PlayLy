import { create } from "zustand";
import { api } from "../services/api";
import { persist } from "zustand/middleware";
import { decodeToken } from "../services/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      username: null,
      isLoggedIn: false,
      isLoading: false,
      isError: false,
      isSuccess: false,
      authToken: null,

      // Login User
      login: async ({ email, password }) => {
        set({ isLoading: true, isError: false });
        try {
          const { data, status } = await api.post("/users/login", {
            email,
            password,
          });

          if (status === 200 && data) {
            const { token } = data;
            const { username } = await decodeToken(token);

            set({
              isLoading: false,
              isSuccess: true,
              isLoggedIn: true,
              authToken: token,
              username: username,
            });

            return true;
          } else {
            set({ isLoading: false, isError: true });
          }
        } catch (error) {
          set({ isLoading: false, isError: true });
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

      logout: (navigate) => {
        set({
          authToken: null,
          username: null,
          isLoggedIn: false,
          isSuccess: false,
        });

        if (navigate) {
          navigate("/login");
        }
      },

      isAuthenticated: () => {
        return !!get().authToken;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
