import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

const uploadimage = asyncHandler(async (req: Request, res: Response) => {
  try {
    const file = req.file;
    
  } catch (error) {}
});
