const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  taskDescription: { type: String, required: false },
  assignedDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  deadline: { type: Date, required: false },
  workerIDs: { type: [mongoose.SchemaTypes.ObjectId], required: true },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  adminID: { type: mongoose.SchemaTypes.ObjectId, required: true },
  collaboratorIDs: { type: [mongoose.SchemaTypes.ObjectId], required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  deadline: { type: Date, required: false },

  tasks: { type: [taskSchema] },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;