import {
  createPlaylistService,
  getAllPlaylistsService
} from "../services/playlistService.js";

export const createPlaylistController = async (req, res, next) => {
  try {
    const { name, songs } = req.body;

    const playlist = await createPlaylistService({ name, songs });

    res.status(201).json({
      success: true,
      results: playlist
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPlaylistsController = async (req, res, next) => {
  try {
    const playlists = await getAllPlaylistsService(req.user.id);

    res.send({
      success: true,
      results: playlists
    });
  } catch (error) {
    next(error);
  }
};
