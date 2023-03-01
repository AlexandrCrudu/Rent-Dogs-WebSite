import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A dog must have a name"],
    maxlength: [30, "A dog's name can have a max length of 30 characters"],
  },
  breed: {
    type: String,
    required: [true, "A dog must have a breed"],
    maxlength: [35, "A dog's breed can have a max length of 35 characters"],
  },
  weight_kg: {
    type: Number,
    default: 0,
    min: [0, "Weight must be 0 or greater"],
  },
  height_cm: {
    type: Number,
    default: 0,
    min: [0, "Height must be 0 or greater"],
  },
  age: {
    type: Number,
    default: 0,
    min: [0, "Age must be 0 or greater"],
  },
  alias: String,
  pricePerDay: {
    type: Number,
    min: [1, "A dog must have a price"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  // toJSON: { virtuals: true },
  // toObject: { virtuals: true },
});

dogSchema.index({ startLocation: "2dsphere" });

const Dog = mongoose.model("Dog", dogSchema);

export default Dog;
