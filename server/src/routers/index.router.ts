import { Router } from "express";
import authRoute from "./auth.router";
import dashboardRoute from "./dashboard.route";
import imagesRoute from "./images.router";

const router = Router();

router.use("/auth", authRoute);
router.use("/dashboard", dashboardRoute);
router.use("/images", imagesRoute);

export default router;
