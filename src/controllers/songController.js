import NodeID3 from "node-id3";
import {
  addSongService,
  getAllSongsServive,
  getSongByIdService
} from "../services/songService";

import HttpError from "../utils/HttpError";
import fs from "fs";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const addSongController = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      throw new HttpError(400, "song details required");
    }

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    });

    await s3.send(command);

    const tags = NodeID3.read(req.file.buffer);

    const song = {
      name,
      song: req.file.originalname,
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

    for (const song of songs) {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: song.song
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 60 });
      song.directUrl = url;
    }

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
