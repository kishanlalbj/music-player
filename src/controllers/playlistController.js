import {
  addSongToPlaylistService,
  createPlaylistService,
  findAllPlaylistService,
  findPlaylistByIdService
} from "../services/playlistService";
import HttpError from "../utils/HttpError";

export const createPlaylistController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { name } = req.query;

    const data = { name, user: userId };

    console.log(data);

    const newPlaylist = await createPlaylistService(data);

    res.send({
      success: true,
      result: newPlaylist
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPlaylistController = async (req, res, next) => {
  try {
    const playlists = await findAllPlaylistService();

    res.send({
      success: true,
      result: playlists
    });
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylistController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { songId } = req.body;

    const playlist = await findPlaylistByIdService(id);

    if (!playlist) throw new HttpError(404, "Playlist not found");

    playlist.tracks.forEach((element, index) => {
      playlist.tracks[index] = element.toString();
    });

    const alreadyAdded = playlist.tracks.includes(songId);

    if (alreadyAdded)
      throw new HttpError(409, "Song already added to playlist");

    const updatedPlaylist = await addSongToPlaylistService(id, songId);

    res.send(updatedPlaylist);
  } catch (error) {
    next(error);
  }
};
