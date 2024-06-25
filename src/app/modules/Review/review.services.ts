import IReview from "./review.interface";
import { Review } from "./review.model";

const addReview = async (payload: IReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviews = async () => {
  const reviews = await Review.find().lean();
  return reviews;
};

export const ReviewServices = {
  addReview,
  getAllReviews,
};
