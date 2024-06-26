import { Model } from "mongoose";

export default interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  password: string;
  profilePic?: string;
  bio?: string;
  role: "admin" | "user";
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    inputtedPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
