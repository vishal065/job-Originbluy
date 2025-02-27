import mongoose, { Types } from "mongoose";

export interface Ivideo extends Document {
  key: string;
  URL: string;
  UserID: Types.ObjectId;
}

const VideosSchema = new mongoose.Schema<Ivideo>(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const VideosModel = mongoose.model<Ivideo>("videos", VideosSchema);

export default VideosModel;
