import { Router } from "express";
import {
  addSongController,
  getAllSongsController,
  playSongController
} from "../controllers/songController.js";
import upload from "../utils/upload.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router
  .route("/")
  .post(verifyJwt, upload.single("file"), addSongController)
  .get(verifyJwt, getAllSongsController);

router.route("/:id/play").get(playSongController);

export default router;
