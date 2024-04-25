import PlayList from "../models/Playlist";

export const createPlaylistService = async (playlist) => {
  try {
    const newPlaylist = new PlayList(playlist);

    const savedPlaylist = await newPlaylist.save();

    return savedPlaylist;
  } catch (error) {
    throw error;
  }
};

export const findAllPlaylistService = async () => {
  try {
    const playlist = await PlayList.find()
      .sort({ createdAt: -1 })
      .populate("tracks");

    return playlist;
  } catch (error) {
    throw error;
  }
};

export const findPlaylistByIdService = async (id) => {
  try {
    const playlist = await PlayList.findById(id).populate("tracks").lean();

    return playlist;
  } catch (error) {
    throw error;
  }
};

export const addSongToPlaylistService = async (id, song) => {
  try {
    const playlists = await PlayList.findByIdAndUpdate(
      id,
      { $push: { tracks: song } },
      { new: 1 }
    );

    return playlists;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
