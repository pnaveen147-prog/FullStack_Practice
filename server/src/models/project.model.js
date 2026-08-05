const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,

      trim: true,
    },

    description: {
      type: String,

      required: true,

      trim: true,
    },

    status: {
      type: String,

      enum: ["Planning", "In Progress", "Completed"],

      default: "Planning",
    },

    priority: {
      type: String,

      enum: ["Low", "Medium", "High"],

      default: "Medium",
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
