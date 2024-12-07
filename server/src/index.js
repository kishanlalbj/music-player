import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import songRouter from "./router/songRouter.js";
import authRouter from "./router/authRouter.js";
import playlistRouter from "./router/playlistRouter.js";
import connectDB from "./db/index.js";

const app = express();

connectDB();

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.use("/api/songs", songRouter);
app.use("/api/auth", authRouter);
app.use("/api/playlists", playlistRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const obj = {
    success: false,
    status,
    message,
    stack: err.stack
  };

  res.status(status).send(obj);
});

app.listen(PORT, () => {
  console.log("Server started at port ", PORT);
});
