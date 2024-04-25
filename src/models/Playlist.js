import mongoose, { Schema } from "mongoose";

const PlaylistSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
        default: []
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PlayList = mongoose.model("Playlist", PlaylistSchema);

export default PlayList;
