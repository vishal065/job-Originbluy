import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
    },
    URL: {
      type: String,
      trim: true,
      required: true,
    },
    UserID: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const VideosModel = mongoose.model("videos", VideosSchema);

export default VideosModel;
