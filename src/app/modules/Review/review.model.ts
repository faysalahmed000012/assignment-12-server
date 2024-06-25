import { model, Schema } from "mongoose";
import IReview from "./review.interface";

const ReviewSchema = new Schema<IReview>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

export const Review = model<IReview>("reviews", ReviewSchema);
