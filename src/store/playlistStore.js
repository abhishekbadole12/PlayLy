import { create } from "zustand";
import { api } from "../services/api";

const usePlaylistStore = create((set) => ({
  playlists: [],
  activePlaylist: null,
  isLoading: false,
  isSucceed: false,

  // Get Playlist's
  getPlaylists: async () => {
    try {
      const { data } = await api.get("/playlists/");
      set({ playlists: data });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get Playlists";
      throw new Error(errorMessage);
    }
  },

  // Get Playlist
  getPlaylist: async (_id) => {
    const playlistId = _id;
    set({ isLoading: true, isSucceed: false });
    try {
      const { data } = await api.get(`/playlists/${playlistId}`);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to get playlist";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false, isSucceed: true });
    }
  },

  // Create Playlist
  createPlaylist: async (title) => {
    try {
      const { data, status } = await api.post("/playlists/", { title });
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
  updatePlaylist: async ({ _id, inputTitle }) => {
    const playlistId = _id;
    const title = inputTitle.trim();

    set({ isLoading: true, isSucceed: false });
    try {
      const { data } = await api.put(`/playlists/${playlistId}`, { title });

      // Update the state with the new playlist data
      set((state) => ({
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === playlistId
            ? { ...playlist, title: data.title }
            : playlist
        ),
      }));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update playlist";
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false, isSucceed: true });
    }
  },

  // Remove Playlist
  removePlaylist: async (_id) => {
    const playlistId = _id;
    try {
      const { status } = await api.delete(`/playlists/${playlistId}`);

      if (status === 200) {
        set((state) => ({
          playlists: state.playlists.filter(
            (playlist) => playlist._id !== playlistId
          ),
        }));
        return true;
      }
    } catch (error) {
      console.log(error);

      const errorMessage =
        error?.response?.data?.message || "Failed to update playlist";
      throw new Error(errorMessage);
    }
  },

  // Add/Remove Song From Playlist
  addRemoveSong: async (playlistId, songId) => {
    try {
      const { data, status } = await api.post(
        `/playlists/${playlistId}/${songId}`,
        { title }
      );
      if (status === 200 && data) {
        console.log(data);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update playlist";
      throw new Error(errorMessage);
    }
  },

  // handle Active Playlisst
  onActivePlaylist: (playlist) => {
    set({ activePlaylist: playlist });
  },
}));

export default usePlaylistStore;
