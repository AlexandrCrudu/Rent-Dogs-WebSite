import express from "express";
import reviewRouter from "../routes/reviewRoutes.js";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createDog,
  deleteDog,
  getAllDogs,
  getDog,
  updateDog,
} from "../controllers/dogController.js";

const router = express.Router();

router.use("/:dogId/reviews", reviewRouter);

router.route("/").get(getAllDogs).post(protect, restrictTo("admin"), createDog);
router
  .route("/:id")
  .get(getDog)
  .patch(protect, restrictTo("admin"), updateDog)
  .delete(protect, restrictTo("admin"), deleteDog);

export default router;
