import express from "express";
import { login, signUp } from "../controllers/authController.js";
import { getAllUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById);

export default router;
