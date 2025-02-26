import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteFile, uploadImageFile } from "../utils/handleBucket";
import { ApiError } from "../utils/ApiError";
import ImagesModel from "../model/Image.models";
import { ApiResponse } from "../utils/ApiResponse";

const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }
  try {
    const result = await uploadImageFile("images", file);
    if (!result) {
      return res.status(400).json(new ApiError(400, "Failed to upload image"));
    }

    const data = new ImagesModel({
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

const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await deleteFile("images", id);
    if (!data) {
      return res.status(400).json(new ApiError(400, "Failed to delete Image"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Image deleted successfully", undefined));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const getAllImages = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const limit = Number(query.limit) || 1;
    const page = Number(query.page) || 1;
    const newPage = limit * (page - 1);

    const data = await ImagesModel.find({ UserID: req.user?._id })
      .skip(newPage)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!data)
      return res.status(400).json(new ApiError(400, "Failed to get data"));

    return res
      .status(200)
      .json(new ApiResponse(200, "Data fetch successfully", data));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

export { uploadImage, deleteImage, getAllImages };
