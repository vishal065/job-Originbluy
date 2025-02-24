import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    videos: [
      {
        videoName: {
          type: String,
          required: true,
        },
        videoID: {
          type: String,
          required: true,
        },
        videoURL: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    images: [
      {
        imageName: {
          type: String,
          required: true,
        },
        imageID: {
          type: String,
          required: true,
        },
        imageURL: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Dashboard", dashboardSchema);
