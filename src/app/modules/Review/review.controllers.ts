import catchAsync from "../../utils/catchAsync";
import { ReviewServices } from "./review.services";

const addReview = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await ReviewServices.addReview(payload);
  res.status(201).json({
    success: true,
    message: "Review Added Successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await ReviewServices.getAllReviews();
  res.status(200).json({
    success: true,
    message: "All Reviews Retrieved Successfully",
    data: reviews,
  });
});

export const ReviewControllers = {
  addReview,
  getAllReviews,
};
