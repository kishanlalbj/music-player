import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
  createPlaylistController,
  getAllPlaylistsController
} from "../controllers/playlistController.js";

const router = Router();

router.route("/create").post(verifyJwt, createPlaylistController);

router.get("/", getAllPlaylistsController);

export default router;
