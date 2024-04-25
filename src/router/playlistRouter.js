import { Router } from "express";
import {
  addSongToPlaylistController,
  createPlaylistController,
  getAllPlaylistController,
  getPlaylistByIdController
} from "../controllers/playlistController";
import verifyJwt from "../middlewares/verifyJwt";

const router = Router();

router.post("/create", verifyJwt, createPlaylistController);

router.get("/all", verifyJwt, getAllPlaylistController);

router.patch("/:id/add", verifyJwt, addSongToPlaylistController);

router.get("/:id", verifyJwt, getPlaylistByIdController);

export default router;
