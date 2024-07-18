const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ToDoModel = require("./Models/TodoList");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo");

app.get("/get", (req, res) => {
  ToDoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/done/:id", (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  ToDoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is Running");
});
