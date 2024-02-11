const express = require("express");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

const router = express.Router();

router.post("/newproject/:userId", async (req, res) => {
    try {
        const { name, description } = req.body;
        const adminID = req.params.userId; 
        
        const newProject = new Project({
            name: name,
            description: description,
            adminID: adminID, 
            startDate: new Date().toDateString() 
        });

        await newProject.save();
        await User.findByIdAndUpdate(adminID, { $push: { projects: newProject._id } });

        res.status(201).json({ message: 'Project created successfully', projectId: newProject._id });
    } catch(error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Extract user details
    const { name, projects } = user;

    // Extract project details
    const projectDetails = [];
    for (const projectId of projects) {
      const project = await Project.findById(projectId);
      if (project) {
        projectDetails.push(project);
      }
    }

    // Send user and project details to frontend
    res.status(200).json({ name, projects: projectDetails });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;