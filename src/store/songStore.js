import { create } from "zustand";
import { api } from "../services/api";

const useSongStore = create((set) => ({
  songs: [],
  activeSong: {},
  isLoading: false,
  isUploading: false,
  isSucceed: false, // Upload - success

  // Get Songs
  getSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/songs/");
      set({ songs: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get Songs";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get Playlist
  getPlaylistSongs: async (_id) => {
    const playlistId = _id;
    set({ isLoading: true, isSucceed: false });
    try {
      const { data } = await api.get(`/playlists/${playlistId}`);
      set({ songs: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get playlist";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false, isSucceed: true });
    }
  },

  // Get Trending Songs
  getTrendingSongs: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/songs/trendings");
      set({ songs: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get Trending Songs";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  // Upload Song - Admin
  uploadSong: async (data) => {
    try {
      set({ isUploading: true });

      const formData = new FormData();

      // Append source text
      formData.append("source", data.source);

      // Append files
      data.files.forEach((file, index) => {
        formData.append("files", file, file.name);
      });

      const response = await api.post("/songs/upload", formData, {
        withCredentials: true,
      });
      if (response.status === 201 && response.data) {
        set({ isUploading: false, isLoading: false, isSucceed: true });
        return true;
      }
    } catch (error) {
      set({ isLoading: false, isSucceed: false, isUploading: false });
      const errorMessage =
        error?.response?.data?.message || "Failed to upload Song";
      throw new Error(errorMessage);
    }
  },

  // Ative Song
  activeSong: (data) => {
    set({ data });
  },
}));

export default useSongStore;
