import { Router } from "express";
import authRoute from "./auth.router";
import dashboardRoute from "./dashboard.route";
import imagesRoute from "./images.router";
import VideosRoute from "./videos.router";

const router = Router();

router.use("/auth", authRoute);
router.use("/dashboard", dashboardRoute);
router.use("/images", imagesRoute);
router.use("/videos", VideosRoute);

export default router;
