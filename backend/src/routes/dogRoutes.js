import express from "express";
import { getAllDogs, getDog } from "../controllers/dogController.js";

const router = express.Router();

router.route("/").get(getAllDogs);
router.route("/:id").get(getDog);

export default router;
