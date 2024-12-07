import NodeID3 from "node-id3";
import { parseBuffer } from "music-metadata";

const getMp3Info = async (file) => {
  const tags = NodeID3.read(file);
  console.log(tags);
  const metadata = await parseBuffer(file, { mimeType: "audio/mpeg" });

  const info = {
    cover: tags?.image?.imageBuffer || "",
    artist: tags.artist,
    album: tags.album,
    duration: formatDuration(metadata.format.duration)
  };

  return info;
};

const formatDuration = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default getMp3Info;
