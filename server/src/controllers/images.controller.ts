import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteFile, getObjectURLs, uploadFile } from "../utils/handleBucket";
import { ApiError } from "../utils/ApiError";
import ImagesModel, { type Iimage } from "../model/Image.models";
import { ApiResponse } from "../utils/ApiResponse";

const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }
  try {
    const result = await uploadFile("images", file);

    if (!result) {
      return res.status(400).json(new ApiError(400, "Failed to upload image"));
    }

    const data = new ImagesModel({
      key: result.key,
      URL: result.URL,
      UserID: req.user?._id,
    });

    await data.save();
    const savedData = await data.save();

    if (savedData) {
      const SignedURL = await getObjectURLs([data.key]);
      data.URL = SignedURL[0];
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "File uploaded successfully", savedData));
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = (await ImagesModel.findById(id)) as Iimage;
    if (!data) {
    }

    const image = await deleteFile(data.key);

    if (!image) {
      return res.status(400).json(new ApiError(400, "Failed to delete Image"));
    }

    const deleted = await ImagesModel.findByIdAndDelete(id);

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

const getAllImages = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { query } = req;

    const limit = Number(query.limit) || 1;
    const page = Number(query.page) || 1;
    const newPage = limit * (page - 1);

    const data = await ImagesModel.aggregate([
      { $match: { UserID: req.user?._id } },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "totalDocuments" }],
          data: [{ $skip: newPage }, { $limit: 5 }],
        },
      },
    ]);
    const metadata = data[0].metadata[0] || { totalDocuments: 0 };
    const result = { ...metadata, data: data[0].data };

    if (!result?.totalDocuments) {
      return res.status(400).json(new ApiError(400, "Failed to get data"));
    }

    const beforeSignedURL = result?.data?.map((item: Iimage) => item.key);

    const SignedURL = await getObjectURLs(beforeSignedURL);

    result.data.forEach((item: Iimage) => {
      const matchingItem = SignedURL.find((element) =>
        element.includes(item.key)
      );
      if (matchingItem) {
        item.URL = matchingItem;
      }
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Data fetch successfully", result));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

export { uploadImage, deleteImage, getAllImages };
