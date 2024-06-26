import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import songRouter from "./router/songRouter";
import authRouter from "./router/authRouter";
import connectDB from "./db";

const app = express();

connectDB();

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;

app.use("/api/songs", songRouter);
app.use("/api/auth", authRouter);

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
