import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import roles from '../utils/roles';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: roles.USER
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song"
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  console.log({password})
  let isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

export default User;
