import { Router } from "express";
import {
  deleteImage,
  getAllImages,
  uploadImage,
} from "../controllers/images.controller";
import { upload } from "../middleware/multer.middleware";
import verifyJWT from "../middleware/auth.middleware";

const router = Router();

router.route("/upload").post(verifyJWT, upload.single("image"), uploadImage);
router.route("/delete/:id").delete(verifyJWT, deleteImage);
router.route("/get").get(verifyJWT, getAllImages);

export default router;
