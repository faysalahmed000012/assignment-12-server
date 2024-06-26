import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.createUser(user);
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUser();
  res.status(200).json({
    success: true,
    message: "All Users are Retrieved Successfully",
    data: users,
  });
});

const getUserByEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  const user = await UserServices.getUserByEmail(email);
  res.status(200).json({
    success: true,
    message: "User data Retrieved Successfully",
    data: user,
  });
});

const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.login(payload);

  res.cookie("refreshToken", result.refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  res.status(200).json({
    success: true,
    message: "User Logged In  Successfully",
    data: result,
  });
});

const generateAccessToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const accessToken = await UserServices.generateAccessToken(token);
  res.status(200).json({
    success: true,
    message: "AccessToken Generated Successfully",
    data: {
      accessToken,
    },
  });
});

const makeAdmin = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await UserServices.makeAdmin(email);
  res.status(200).json({
    success: true,
    message: "New Admin Created Successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getUserByEmail,
  login,
  generateAccessToken,
  makeAdmin,
};
