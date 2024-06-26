import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import IUser from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";

const createUser = async (payload: IUser) => {
  // checking if user already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(501, "User Already Exists");
  }

  const result = await User.create(payload);
  return result;
};

const getAllUser = async () => {
  const users = await User.find();
  return users;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    throw new AppError(404, "User Does Not Exists");
  }
  if (!User.isPasswordMatched(password, user.password)) {
    throw new AppError(401, "Password Does not match");
  } else {
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
};

const generateAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, role } = decoded;
  const jwtPayload = {
    email,
    role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    accessToken,
  };
};

const makeAdmin = async (email: string) => {
  const updateDoc = {
    $set: { role: "admin" },
  };
  const updated = await User.findOneAndUpdate({ email }, updateDoc, {
    new: true,
  });
  return updated;
};

export const UserServices = {
  createUser,
  getAllUser,
  getUserByEmail,
  login,
  generateAccessToken,
  makeAdmin,
};
