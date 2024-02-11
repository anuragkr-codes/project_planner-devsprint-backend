const express = require('express');
const Project = require('../models/projectModel');

const router = express.Router();

router.get('/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Retrieve project details from the database based on the project ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Send project details to frontend
    res.status(200).json(project);
  } catch (error) {
    console.error('Error retrieving project details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
