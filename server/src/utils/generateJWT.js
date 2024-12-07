import jwt from "jsonwebtoken";

export const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      },
      (err, token) => {
        if (err) {
          console.log(err);
          if (err.name === "JsonWebTokenError") reject("Unauthorized");
          else reject("Internal Server Error");
        }
        resolve(token);
      }
    );
  });
};

export const generateRefreshJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) {
          console.log(err);
          if (err.name === "JsonWebTokenError") reject("Unauthorized");
          else reject("Internal Server Error");
        }
        resolve(token);
      }
    );
  });
};
