import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { parseCookies } from "../utils/parseCookies.js";
import HttpError from "../utils/HttpError.js";
import { generateJWT, generateRefreshJWT } from "../utils/generateJWT.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (user) {
      throw new HttpError(409, "Email is already registered");
    }

    const newuser = new User({
      name,
      email,
      password
    });

    await newuser.save();

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new HttpError(400, "All fields required");

    const user = await User.findOne({ email });

    if (!user) throw new HttpError(404, "User not found");

    const isValid = await user.isValidPassword(password);

    if (!isValid) {
      throw new HttpError(401, "Email or password invalid");
    }

    const token = await generateJWT({
      id: user._id,
      email: user.email,
      name: user.name
    });

    const refresh = await generateRefreshJWT({
      id: user._id,
      email: user.email
    });

    res.cookie("rtkn", refresh, {
      secure: true,
      sameSite: "None",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send({ success: true, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const cookies = parseCookies(req.headers.cookie);

    await jwt.verify(
      cookies?.rtkn,
      process.env.JWT_REFRESH_SECRET,
      async (error, payload) => {
        if (error) throw new HttpError(403, "Forbidden");

        req.user = payload;

        const user = await User.findById(req.user.id).lean();

        const access_token = await generateJWT({
          id: user?._id,
          email: user?.email,
          iat: Math.floor(Date.now() / 1000) - 30
        });

        res.send({ access_token });
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
};
