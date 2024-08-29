import { create } from "zustand";
import { api } from "../services/api";

const usePlaylistStore = create((set) => ({
  playlists: [],
  activePlaylist: null,
  isLoading: false,
  isSucceed: false,

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
  createPlaylist: async (title) => {
    console.log(title);

    try {
      const { data, status } = await api.post(
        "/playlists/",
        { title },
        {
          withCredentials: true,
        }
      );
      if (status === 201 && data) {
        set({ isLoading: false, isSucceed: true });
        set((state) => ({ playlists: [...state.playlists, data] }));
        return true;
      }
    } catch (error) {
      set({ isLoading: false, isSucceed: false });
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

  // Remove Playlist
  removePlaylist: async (_id) => {
    try {
      const { data, status } = await api.delete(
        `/playlists/`,
        { playlistId: _id },
        {
          withCredentials: true,
        }
      );

      if (status === 200) {
        set((state) => ({
          playlists: state.playlists.filer((playlist) => playlist._id !== _id),
        }));
        return true;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update playlist";
      throw new Error(errorMessage);
    }
  },
}));

export default usePlaylistStore;
