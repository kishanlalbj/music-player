import { Router } from "express";
import {
  getCurrentUserController,
  loginController,
  registerController
} from "../controllers/authController";
import verifyJwt from "../middlewares/verifyJwt";

const router = Router();

router.route("/register").post(registerController);

router.route("/login").post(loginController);

router.route('/current-user').get(verifyJwt, getCurrentUserController)

export default router;
