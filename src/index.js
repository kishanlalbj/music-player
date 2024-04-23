import "dotenv/config";
import express from "express";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import songRouter from "./router/songRouter";
import authRouter from "./router/authRouter";
import playlistRouter from "./router/playlistRouter";
import connectDB from "./db";

const app = express();

connectDB();

const allowList = ["localhost", "::1"];

app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: false,
    message: "You reached your request limits, try again later",
    skip: (req, res) => {
      return allowList.includes(req.ip);
    }
  })
);
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
