import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import dogRouter from "./routes/dogRoutes.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

process.on("unhandledException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! Shutting down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const db_URL = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db_URL).then(() => {
  console.log("DB connection successful !");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/dogs", dogRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// server set up and configs
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => process.exit(1));
});
