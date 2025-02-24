import { Router } from "express";
import { logout, signin, signup } from "../controllers/auth.controller";
import { Validator } from "../validation/index.validation";
import { authSchema } from "../validation/validationSchema";
import verifyJWT from "../middleware/auth.middleware";

const router = Router();

const validator = new Validator(authSchema);

router.route("/signup").post(validator.validate, signup);
router.route("/signin").post(validator.validate, signin);
router.route("/logout").post(verifyJWT, logout);

export default router;
