import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constants";
import { ReviewControllers } from "./review.controllers";

const router = Router();

router.get("/", auth(USER_ROLE.admin), ReviewControllers.getAllReviews);
router.post("/", auth(USER_ROLE.user), ReviewControllers.addReview);

export const ReviewRoutes = router;
