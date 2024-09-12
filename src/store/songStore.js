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

      const response = await api.post("/songs/upload", formData);
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

  // Update - Song Download Count
  updateDownloadCount: async (songId) => {
    try {
      const { data, status } = await api.put(`/songs/${songId}/download`);
      if (data && status == 200) {
        set((state) => ({
          songs: state.songs.map((song) =>
            song._id === songId
              ? { ...song, downloadCount: data.downloadCount }
              : song
          ),
        }));
        return true;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to download Song";
      throw new Error(errorMessage);
    }
  },

  // Update - Song Play Count
  updatePlayCount: async (songId) => {
    try {
      const { data, status } = await api.put(`/songs/${songId}/play`);
      if (data && status == 200) {
        set((state) => ({
          songs: state.songs.map((song) =>
            song._id === songId ? { ...song, playCount: data.playCount } : song
          ),
        }));
        return true;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to play Song";
      throw new Error(errorMessage);
    }
  },

  // Ative Song
  activeSong: (data) => {
    set({ data });
  },
}));

export default useSongStore;
