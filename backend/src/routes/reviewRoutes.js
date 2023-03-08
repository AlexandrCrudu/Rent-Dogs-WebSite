import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";

import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
// router.use(restrictTo("admin"));

router.route("/").get(getAllReviews).post(createReview);
router
  .route("/:id")
  .get(getAllReviews)
  .patch(updateReview)
  .delete(deleteReview);

export default router;
