import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "../../../hooks/axiosHandler";

export enum LoadingType {
  Idle = "idle",
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}
export interface Image {
  id: string;
  url: string;
}

const uploadImages = createAsyncThunk<Image, FormData>(
  "images/upload",
  async (formData) => {
    try {
      const res = await axiosHandler.post(
        "http://localhost:3001/api/v1/images/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.statusCode === 200) {
        return res.data;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  }
);

const getImages = createAsyncThunk<Image[], void>("images/get", async () => {
  try {
    const res = await axiosHandler.get(
      "http://localhost:3001/api/v1/images/get?page=1&limit=5"
    );
    if (res.data.statusCode === 200) {
      // console.log(res);

      return res.data;
    }
    return [];
  } catch (error) {
    console.log(error);
  }
});

export { uploadImages, getImages };
