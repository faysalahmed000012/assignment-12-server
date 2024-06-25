import { Router } from "express";
import { ReviewControllers } from "./review.controllers";

const router = Router();

router.get("/", ReviewControllers.getAllReviews);
router.post("/", ReviewControllers.addReview);

export const ReviewRoutes = router;
