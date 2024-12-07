import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
