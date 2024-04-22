import { Router } from "express";
import {
  addSongController,
  getAllSongsController,
  playSongController
} from "../controllers/songController";
import upload from "../utils/upload";
import verifyJwt from "../middlewares/verifyJwt";

const router = Router();

router
  .route("/")
  .post(verifyJwt, upload.single("file"), addSongController)
  .get(getAllSongsController);

router.route("/:id/play").get(playSongController);

export default router;
