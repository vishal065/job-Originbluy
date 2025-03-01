import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "../../../hooks/axiosHandler";

export interface Video {
  _id: string;
  URL: string;
  UserID: string;
  createdAt: Date;
  key: string;
  statusCode: number;
}

const uploadvideo = createAsyncThunk<Video, FormData>(
  "videos/upload",
  async (FormData) => {
    try {
      const res = await axiosHandler.post(`/videos/upload`, FormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.statusCode === 200) {
        return res.data.data;
      }
      return [];
    } catch (error) {
      console.error(error);
    }
  }
);

const getVideos = createAsyncThunk<Video[], number>(
  "videos/get",
  async (page: number) => {
    try {
      const res = await axiosHandler.get(`/videos/get?page=${page}&limit=5`);

      if (res.data.statusCode === 200) {
        return res.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

const deleteVideo = createAsyncThunk<Video, string>(
  "videos/delete",
  async (id) => {
    try {
      const res = await axiosHandler.delete(`/videos/delete/${id}`);
      if (res.data.statusCode === 200) {
        return res.data;
      }
      return [];
    } catch (error) {
      console.error(error);
    }
  }
);

export { uploadvideo, getVideos, deleteVideo };
