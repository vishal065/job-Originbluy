import { createSlice } from "@reduxjs/toolkit";
import { LoadingType } from "../images/imageSlice";
import { deleteVideo, getVideos, uploadvideo, Video } from "./videoAction";

export interface VideoState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videos: any | null;
  loading: LoadingType;
}
const initialState: VideoState = {
  videos: null,
  loading: LoadingType.Idle,
};

export const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(uploadvideo.fulfilled, (state, action) => {
      state.videos.data.unshift(action.payload);
    });
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.videos = state.videos.filter(
        (video: Video) => video._id !== action.meta.arg
      );
    });
  },
});
