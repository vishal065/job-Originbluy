import mongoose, { Types } from "mongoose";

export interface Iimage extends Document {
  key: string;
  URL: string;
  UserID: Types.ObjectId;
}
const ImagesSchema = new mongoose.Schema<Iimage>(
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

const ImagesModel = mongoose.model<Iimage>("images", ImagesSchema);

export default ImagesModel;
