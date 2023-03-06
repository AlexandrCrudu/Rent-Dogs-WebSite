import fs from "fs";
import mongoose from "mongoose";
import Dog from "../src/models/dogModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
// const db_URL = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD
// );
const db_URL = `mongodb+srv://Alex:Sandu2002@rent-dog-cluster.uvjtgue.mongodb.net/dog-rent`;
mongoose.connect(db_URL).then(() => "DB connection successfull");

const dogs = JSON.parse(fs.readFileSync(`dogs.json`));

const importData = async () => {
  try {
    await Dog.create(dogs);
    console.log("Data successfully loaded !");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

const deleteData = async () => {
  try {
    await Dog.deleteMany();
    console.log("Data successfully deleted !");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
