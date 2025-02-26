import mongoose from "mongoose";

const ImagesSchema = new mongoose.Schema(
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

const ImagesModel = mongoose.model("images", ImagesSchema);

export default ImagesModel;
