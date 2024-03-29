import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  // only run function if password was modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_PASSWORD_SALT)
  );

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
