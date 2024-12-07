import Song from "../models/Song.js";
import HttpError from "../utils/HttpError.js";

export const addSongService = async (song) => {
  if (!song) throw new HttpError(400, "song data required");

  const newSong = new Song(song);

  const savedSong = await newSong.save();

  return savedSong;
};

export const getSongByIdService = async (id) => {
  if (!id) throw new HttpError(400, "Song id required");

  const song = await Song.findById(id).lean();

  if (!song) throw new HttpError(404, "Song with that id not found");

  return song;
};

export const getAllSongsServive = async () => {
  const songs = await Song.find().lean();

  return songs;
};
