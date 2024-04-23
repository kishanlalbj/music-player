import { Router } from "express";
import {
  addSongToPlaylistController,
  createPlaylistController,
  getAllPlaylistController
} from "../controllers/playlistController";
import verifyJwt from "../middlewares/verifyJwt";

const router = Router();

router.post("/create", verifyJwt, createPlaylistController);

router.get("/all", verifyJwt, getAllPlaylistController);

router.patch("/:id/add", verifyJwt, addSongToPlaylistController);

export default router;
