import express from "express";

import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/reviewController";

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getAllReviews).post(createReview);
router
  .route("/:id")
  .get(getAllReviews)
  .patch(updateReview)
  .delete(deleteReview);

export default router;
