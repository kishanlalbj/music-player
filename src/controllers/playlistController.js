import { GetObjectCommand } from "@aws-sdk/client-s3";
import {
  addSongToPlaylistService,
  createPlaylistService,
  findAllPlaylistService,
  findPlaylistByIdService
} from "../services/playlistService";
import HttpError from "../utils/HttpError";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../utils/s3";

export const createPlaylistController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { name } = req.query;

    const data = { name, user: userId };

    const newPlaylist = await createPlaylistService(data);

    res.send({
      success: true,
      result: newPlaylist
    });
  } catch (error) {
    next(error);
  }
};

export const getPlaylistByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const playlist = await findPlaylistByIdService(id);

    if (!playlist) throw new HttpError(404, "Playlist is not found");

    for (const track of playlist.tracks) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: track.song
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 60 });
      track.directUrl = url;
    }

    res.send({
      success: true,
      result: playlist
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
      playlist.tracks[index] = element._id.toString();
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
