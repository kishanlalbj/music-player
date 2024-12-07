import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: [100, "Name should not be more than 100 characters"]
    },
    song: {
      type: String,
      required: true
    },
    cover: {
      type: Buffer,
      default: ""
    },
    album: {
      type: String,
      default: "Unknown"
    },
    artist: {
      type: String,
      default: "Unknown"
    },
    duration: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Song = mongoose.model("Song", SongSchema);

export default Song;
