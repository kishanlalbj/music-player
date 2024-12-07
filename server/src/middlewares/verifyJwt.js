import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError.js";

const verifyJwt = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    console.log(process.env.JWT_SECRET);

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        if (err.name === "JsonWebTokenError")
          throw new HttpError(401, "Unauthorized token");

        return res.status(401).json({ message: err.message });
      }

      req.user = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyJwt;
