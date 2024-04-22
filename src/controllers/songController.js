import NodeID3 from "node-id3";
import {
  addSongService,
  getAllSongsServive,
  getSongByIdService
} from "../services/songService";

import HttpError from "../utils/HttpError";
import fs from "fs";

export const addSongController = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      throw new HttpError(400, "song details required");
    }

    const tags = NodeID3.read(req.file.path);

    const song = {
      name,
      song: req.file.filename,
      cover: tags?.image?.imageBuffer || "",
      artist: tags.artist,
      album: tags.album
    };

    const newSong = await addSongService(song);

    res.send({
      success: true,
      message: "song added",
      song: newSong
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSongsController = async (req, res, next) => {
  try {
    const songs = await getAllSongsServive();

    res.send({
      success: true,
      results: songs
    });
  } catch (error) {
    next(error);
  }
};

export const playSongController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    if (!id) throw new HttpError(400, "Song id is required");

    if (!range) {
      throw new HttpError(400, "Range headers mmissing");
    }

    const { song } = await getSongByIdService(id);

    const audio = `./musics/${song}`;
    const audioSize = fs.statSync(audio).size;

    const chunkSize = 10 ** 6; // ~1mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, audioSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mpeg"
    };

    res.writeHead(206, headers);

    const musicStream = fs.createReadStream(audio, { start, end });
    musicStream.pipe(res);
  } catch (error) {
    next(error);
  }
};
