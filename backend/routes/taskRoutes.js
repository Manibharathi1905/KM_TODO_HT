const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const router = express.Router();

module.exports = (io) => {
  // JWT Middleware
  router.use((req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  });

  // GET all tasks
  router.get("/", async (req, res) => {
    const tasks = await Task.find({
      $or: [{ owner: req.user.id }, { sharedWith: req.user.id }],
    });
    res.json(tasks);
  });

  // POST new task
  router.post("/", async (req, res) => {
    const task = await Task.create({ ...req.body, owner: req.user.id });
    io.emit("taskCreated", task);
    res.json(task);
  });

  // PUT update task
  router.put("/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.emit("taskUpdated", task);
    res.json(task);
  });

  // DELETE task
  router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    io.emit("taskDeleted", req.params.id);
    res.sendStatus(204);
  });

  return router;
};
