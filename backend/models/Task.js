const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  dueDate: Date,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  sharedWith: [String],
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
