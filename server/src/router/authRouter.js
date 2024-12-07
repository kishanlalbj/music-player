import { Router } from "express";
import {
  getMeController,
  loginController,
  refreshTokenController,
  registerController
} from "../controllers/authController.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.route("/register").post(registerController);

router.route("/login").post(loginController);

router.route("/refresh-token").get(refreshTokenController);

router.get("/me", verifyJwt, getMeController);

export default router;
