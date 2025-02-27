import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getImages, Image, LoadingType, uploadImages } from "./imagesAction";

export interface ImagesState {
  images: Image[];
  loading: LoadingType;
}

const initialState: ImagesState = {
  images: [],
  loading: LoadingType.Idle,
};

export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      uploadImages.fulfilled,
      (state, action: PayloadAction<Image>) => {
        state.images.push(action.payload);
      }
    );
    builder.addCase(
      getImages.fulfilled,
      (state, action: PayloadAction<Image[]>) => {
        state.images = action.payload;
      }
    );
  },
});

export default imageSlice.reducer;
