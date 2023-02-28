import express from "express";
import { getAllDogs } from "../controllers/dogController.js";

const router = express.Router();

router.route("/").get(getAllDogs);

export default router;
