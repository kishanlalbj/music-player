import Playlist from "../models/Playlist.js";

export const createPlaylistService = async ({ playlist }) => {
  const newPlaylist = new Playlist({
    name: playlist.name,
    songs: playlist.songs ?? []
  });

  const savedPlaylist = await newPlaylist.save();

  return savedPlaylist;
};

export const getAllPlaylistsService = async (userId) => {
  const playlists = await Playlist.find({ user: userId }).lean();

  return playlists;
};
