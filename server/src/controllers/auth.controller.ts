import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { UserModel, type IUser } from "../model/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const signup = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const existingUser = await UserModel.findOne({ email: data.email });

    if (existingUser)
      return res.status(400).json(new ApiError(400, "User already exist"));

    const user = await UserModel.create({ ...data });

    if (!user)
      return res.status(500).json(new ApiError(500, "Failed to register user"));

    return res
      .status(200)
      .json(new ApiResponse(200, "Register successfully", undefined));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const signin = asyncHandler(async (req, res) => {
  try {
    const data = req.body;

    const user = await UserModel.findOne({ email: data.email });

    if (!user)
      return res.status(500).json(new ApiError(500, "Failed to login"));

    const isValidPassword = await user.isPasswordCorrect(data.password);

    if (!isValidPassword) {
      return res.status(400).json(new ApiError(400, "Invalid Credential"));
    }

    const accessToken = user.generateToken();

    const loggedInUser: Partial<IUser> = user.toObject();
    delete loggedInUser.password;

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 day (milliseconds)
      })
      .json(
        new ApiResponse(200, "login successfully", {
          ...loggedInUser,
          accessToken,
        })
      );
  } catch (error) {
    res.status(500).json(new ApiError(500, "Something went wrong", [error]));
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { _id } = req.user as IUser;

    if (!_id)
      return res.status(400).json(new ApiError(400, "something went wrong"));

    return res
      .status(200)
      .clearCookie("accessToken")
      .json(new ApiResponse(200, "Logout Successfully", undefined));
      
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong", [error]));
  }
});

export { signup, signin, logout };
