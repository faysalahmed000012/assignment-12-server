import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import IUser, { UserModel } from "./user.interface";

const UserSchema = new Schema<IUser, UserModel>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phone: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  profilePic: {
    type: String,
    required: false,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
});

// hashing password with bcrypt
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(12));
  next();
});

// set '' after saving password
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isPasswordMatched = async function (
  inputtedPassword,
  hashedPassword
) {
  return await bcrypt.compare(inputtedPassword, hashedPassword);
};

export const User = model<IUser, UserModel>("users", UserSchema);
