import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { getAllDogs, getDog } from "../controllers/dogController.js";

const router = express.Router();

router.route("/").get(protect, restrictTo("user"), getAllDogs);
router.route("/:id").get(getDog);

export default router;
