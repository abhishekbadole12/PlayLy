import { create } from "zustand";
import { api } from "../services/api";

const useSongStore = create((set) => ({
  songs: [],
  isLoading: false,
  isSuccess: false, // Upload - success

  // Get Songs
  getSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/songs/", { withCredentials: true });
      set({ songs: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get Songs";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Upload Song - Admin
  uploadSong: async (data) => {
    try {
      set({ isLoading: true });
      await api.post("/songs/upload", { data }, { withCredentials: true });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to upload Song";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSongStore;
