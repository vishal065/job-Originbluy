import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "../../../hooks/axiosHandler";

export interface Image {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data(data: any): unknown;
  _id: string | null;
  URL: string;
  UserID: string;
  createdAt: Date;
  key: string;
}

export const uploadImages = createAsyncThunk<Image, FormData>(
  "images/upload",
  async (formData) => {
    try {
      const res = await axiosHandler.post("/images/upload", formData, {
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

const getImages = createAsyncThunk<Image[], number>(
  "images/get",
  async (page = 1) => {

    try {
      const res = await axiosHandler.get(`/images/get?page=${page}&limit=5`);

      if (res.data.statusCode === 200) {
        return res.data.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

const deleteImage = createAsyncThunk<Image[], string>(
  "images/delete",
  async (id) => {
    try {
      const res = await axiosHandler.delete(`/images/delete/${id}`);

      if (res.data.statusCode === 200) {
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export { getImages, deleteImage };
