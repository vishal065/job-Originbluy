import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteFile, getObjectURLs, uploadFile } from "../utils/handleBucket";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import VideosModel, { type Ivideo } from "../model/Video.models";

const uploadVideo = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }
  try {
    const result = await uploadFile("videos", file);
   
    if (!result) {
      return res.status(400).json(new ApiError(400, "Failed to upload image"));
    }

    const data = new VideosModel({
      key: result.key,
      URL: result.URL,
      UserID: req.user?._id,
    });

    await data.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "File uploaded successfully", data));
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = (await VideosModel.findById(id)) as Ivideo;
    if (!data) {
    }

    const image = await deleteFile(data.key);

    if (!image) {
      return res.status(400).json(new ApiError(400, "Failed to delete Image"));
    }

    const deleted = await VideosModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(400).json(new ApiError(400, "Failed to delete Image"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Image deleted successfully", undefined));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const getAllVideos = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const limit = Number(query.limit) || 1;
    const page = Number(query.page) || 1;
    const newPage = limit * (page - 1);

    const data = (await VideosModel.find({ UserID: req.user?._id })
      .skip(newPage)
      .limit(limit)
      .sort({ createdAt: -1 })) as Ivideo[];

    if (!data)
      return res.status(400).json(new ApiError(400, "Failed to get data"));

    const beforeSignedURL = data.map((item) => item.key);

    const SignedURL = await getObjectURLs(beforeSignedURL);

    data.forEach((item) => {
      const matchingItem = SignedURL.find((element) =>
        element.includes(item.key)
      );
      if (matchingItem) {
        item.URL = matchingItem;
      }
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Data fetch successfully", data));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const playVideo = asyncHandler(async (req, res) => {
  try {
    const { key } = req.body;

    if (!key)
      return res.status(400).json(new ApiError(400, "Failed to play video"));

    const url = getObjectURLs(key);
    return res
      .status(200)
      .json(new ApiResponse(200, "Data fetch successfully", url));
  } catch (error) {
    console.log(error);

    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

export { uploadVideo, deleteVideo, getAllVideos, playVideo };
