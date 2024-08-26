import { create } from "zustand";
import { api } from "../services/api";

const usePlaylistStore = create((set) => ({
  playlists: [],
  activePlaylist: null,

  // Get Playlists
  getPlaylists: async () => {
    try {
      const { data } = await api.get("/playlists/", {
        withCredentials: true,
      });

      set({ playlists: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get Playlists";
      throw new Error(errorMessage);
    }
  },

  // Create Playlist
  createPlaylist: async ({ title }) => {
    try {
      const { data } = await api.post("/playlists/", {
        withCredentials: true,
      });

      set((state) => ({ ...state, data }));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create playlist";
      throw new Error(errorMessage);
    }
  },

  // Update Playlist
  updatePlaylist: async ({ playlistId, title }) => {
    try {
      const { data } = await api.post(
        `/playlists/${playlistId}`,
        { title },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      //   set((state) => ({ ...state, data }));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update playlist";
      throw new Error(errorMessage);
    }
  },
}));

export default usePlaylistStore;
