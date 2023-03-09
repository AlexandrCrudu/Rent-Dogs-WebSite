import express from "express";
import { login, protect, signUp } from "../controllers/authController.js";
import {
  getMe,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.use("/me", protect, getMe, getUserById);
router.post("/signup", signUp);
router.post("/login", login);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);

export default router;
