const router = require('express').Router();
const db = require('./projects-model.js');

router.get('/', async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the projects from the database.'
    });
  }
});

module.exports = router;
