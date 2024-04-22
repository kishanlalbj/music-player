import { Router } from "express";
import {
  addSongController,
  getAllSongsController,
  playSongController
} from "../controllers/songController";
import upload from "../utils/upload";

const router = Router();

router
  .route("/")
  .post(upload.single("file"), addSongController)
  .get(getAllSongsController);

router.route("/:id/play").get(playSongController);

export default router;
