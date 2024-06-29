import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";

export default function auth(...requiredRoles: string[]) {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = User.findOne({ email });
    if (!user) {
      throw new AppError(404, "User does not exists");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
}
