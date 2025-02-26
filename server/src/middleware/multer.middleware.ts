import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: function (_req: Request, _file: Express.Multer.File, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const fileTypes = /jpeg|jpg|png|webp|mp4|avi|mkv|mov/;
  const extname = fileTypes.test(String(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(String(file.mimetype));
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error(`Only these files are allowed ${fileTypes}`));
  }
};

export const upload = multer({ storage: storage, fileFilter });
