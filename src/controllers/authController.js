import User from "../models/User";
import HttpError from "../utils/HttpError";
import generateJWT from "../utils/generateJWT";

export const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (user) {
      throw new HttpError(409, "Email is already registered");
    }

    const newuser = new User({
      email,
      password
    });

    const savedUser = await newuser.save();

    res.send(savedUser);
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
      id: user._id
    });

    res.send({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
