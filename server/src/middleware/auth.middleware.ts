import CONFIG from "../config/config";
import { UserModel } from "../model/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";

const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token)
        return res.status(400).json(new ApiError(400, "Unauthorize User"));

      const decodedToken = jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET) as {
        id: string;
      };

      if (!decodedToken)
        return res.status(400).json(new ApiError(400, "Unauthorize User"));

      const user = await UserModel.findById(decodedToken.id);
      if (!user) {
        return res
          .status(200)
          .clearCookie("accessToken")
          .json(
            new ApiResponse(200, "Invalid user please login again", undefined)
          );
      }
      req.user = user;
      return next();
    } catch (error) {
      console.error(error);
    }
  }
);

export default verifyJWT;
