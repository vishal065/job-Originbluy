import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import verifyJWT from "../middleware/auth.middleware";
import {
  deleteVideo,
  getAllVideos,
  playVideo,
  uploadVideo,
} from "../controllers/video.controller";

const router = Router();

router.route("/upload").post(verifyJWT, upload.single("video"), uploadVideo);
router.route("/delete/:id").delete(verifyJWT, deleteVideo);
router.route("/get").get(verifyJWT, getAllVideos);
router.route("/play").post(verifyJWT, playVideo);

export default router;
