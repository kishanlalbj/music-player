import jwt from "jsonwebtoken";

const generateJWT = (payload) => {
  console.log(process.env.JWT_SECRET);
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1y"
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

export default generateJWT;
