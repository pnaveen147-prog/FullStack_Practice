
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    age: {
      type: Number,
      min: 18,
      max: 100
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "User"],
      default: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);