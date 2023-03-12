import fs from "fs";
import mongoose from "mongoose";
import Dog from "../src/models/dogModel.js";
import dotenv from "dotenv";
import User from "../src/models/userModel.js";
import Review from "../src/models/reviewModel.js";

const reviews = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eleifend metus nec est vestibulum, sit amet euismod nisl sodales. Donec in enim sed ex blandit tristique at a eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus ut augue quis felis feugiat suscipit vel vel quam",
  "Pellentesque consectetur quam a purus pharetra, id posuere nunc dictum. Maecenas quis justo lacus. Cras posuere pellentesque dolor, in efficitur sapien semper non. Morbi non semper felis, non sollicitudin metus. Nam ultrices tristique dui, sed ultricies purus malesuada sed",
  "Ut quis arcu ac nisl blandit dictum vel vel tellus. Etiam vitae dolor massa. Sed quis consectetur metus. Phasellus congue enim vel sapien commodo, id maximus tellus mattis. Praesent ullamcorper, eros sit amet pretium dictum, purus velit rutrum velit, ut bibendum turpis lorem vel velit",
];

const first_demo_user = {
  username: "userOne",
  email: "userone@gmail.com",
  password: "useronepassword",
};
const second_demo_user = {
  username: "userTwo",
  email: "userTwo@gmail.com",
  password: "usertwopassword",
};
const third_demo_user = {
  username: "adminOne",
  email: "adminone@gmail.com",
  password: "adminonepassword",
  role: "admin",
};

dotenv.config({ path: "./config.env" });
// const db_URL = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD
// );
const db_URL = `mongodb+srv://Alex:Sandu2002@rent-dog-cluster.uvjtgue.mongodb.net/dog-rent`;
mongoose.connect(db_URL).then(() => "DB connection successfull");

const dogs = JSON.parse(fs.readFileSync(`dogs.json`));

const importDogs = async () => {
  try {
    await Dog.create(dogs);
    console.log("Data successfully loaded !");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

const deleteData = async (Model) => {
  try {
    await Model.deleteMany();
    console.log("Data successfully deleted !");
  } catch (err) {
    console.log(err);
  }
  // process.exit(0);
};

const importUsers = async () => {
  try {
    await Promise.all([
      User.create(first_demo_user),
      User.create(second_demo_user),
      User.create(third_demo_user),
    ]);
    console.log("Users data successfully loaded !");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

const importReviews = async () => {
  try {
    const dogs = await Dog.find();
    const users = await User.find().limit(3);

    for (const dog of dogs) {
      for (const [index, review] of reviews.entries()) {
        await Review.create({
          review,
          rating: Math.floor(Math.random() * 5 + 1),
          dog: dog.id,
          user: users[index].id,
        });
      }
    }

    console.log("Reviews successfully loaded !");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
};

if (process.argv[2] === "--importDogs") {
  importDogs();
} else if (process.argv[2] === "--deleteDogs") {
  deleteData(Dog);
} else if (process.argv[2] === "--importReviews") {
  importReviews();
} else if (process.argv[2] === "--deleteReviews") {
  deleteData(Review);
} else if (process.argv[2] === "--importUsers") {
  importUsers();
} else if (process.argv[2] === "--deleteUsers") {
  deleteData(User);
}
