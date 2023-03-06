import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
} from "../controllers/bookingController";

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getAllBookings).post(createBooking);
router
  .route("/:id")
  .get(getAllBookings)
  .patch(updateBooking)
  .delete(deleteBooking);

export default router;
