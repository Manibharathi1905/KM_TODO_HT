const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task Schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const task = new Task({ text: req.body.text, completed: false });
  await task.save();
  res.json(task);
});

app.put("/api/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server started on http://localhost:5000"));
