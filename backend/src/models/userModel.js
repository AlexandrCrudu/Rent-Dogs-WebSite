import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email adress"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: 8,
    select: false,
  },
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    minLength: 2,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
