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
      type: String,
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
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Song = mongoose.model("Song", SongSchema);

export default Song;
