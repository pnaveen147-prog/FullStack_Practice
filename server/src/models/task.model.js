const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
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

      enum: ["Todo", "In Progress", "Testing", "Completed"],

      default: "Todo",
    },

    priority: {
      type: String,

      enum: ["Low", "Medium", "High", "Critical"],

      default: "Medium",
    },

    dueDate: {
      type: Date,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Project",

      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
