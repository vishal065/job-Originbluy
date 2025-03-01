import { deleteImage, getImages, Image, uploadImages } from "./imagesAction";
import { createSlice } from "@reduxjs/toolkit";

export enum LoadingType {
  Idle = "idle",
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface ImagesState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any | null;
  loading: LoadingType;
}

const initialState: ImagesState = {
  images: null,
  loading: LoadingType.Idle,
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadImages.fulfilled, (state, action) => {
      state.images?.data.unshift(action.payload);
    });
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.images =
        state.images &&
        state.images.filter((image: Image) => image._id !== action.meta.arg);
    });
  },
});
