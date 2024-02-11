const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  assignedDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  deadline: { type: Date, required: false },
  workerIds: { type: [mongoose.SchemaTypes.ObjectId], required: true },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  adminId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  collaboratorIds: { type: [mongoose.SchemaTypes.ObjectId], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  deadline: { type: Date, required: false },

  tasks: { type: [taskSchema] },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Projects;
