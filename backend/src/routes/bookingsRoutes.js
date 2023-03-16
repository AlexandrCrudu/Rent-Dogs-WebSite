import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";

import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
  createCheckoutSession,
} from "../controllers/bookingController.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
// router.use(restrictTo("admin"));

router.post("/create-checkout-session/:dogId", createCheckoutSession);

router.route("/").get(getAllBookings).post(createBooking);
router
  .route("/:id")
  .get(getAllBookings)
  .patch(updateBooking)
  .delete(deleteBooking);

export default router;
