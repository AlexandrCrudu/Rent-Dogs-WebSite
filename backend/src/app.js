import express from "express";
import mongoose from "mongoose";
import dogRouter from "./routes/dogRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

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

// server set up and configs
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
