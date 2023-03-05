import express from "express";
import { protect } from "../controllers/authController.js";
import { getAllDogs, getDog } from "../controllers/dogController.js";

const router = express.Router();

router.route("/").get(protect, getAllDogs);
router.route("/:id").get(getDog);

export default router;
