const router = require('express').Router();
const db = require('./projects-model.js');

router.post('/', async (req, res) => {
  try {
    const {name, description} = req.body;
    console.log(req.body);
    if (
      name.length > 0 &&
      name.length <= 128 &&
      description.length > 0 &&
      description.length <= 128
    ) {
      const newProject = await db.addProject(req.body);
      res.status(201).json(newProject);
    } else {
      res
        .status(400)
        .json({errorMessage: 'Please provide a name to the project.'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the project to the database.'});
  }
});

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

router.get('/:id', async (req, res) => {
  try {
    const foundProject = await db.getProjectById(req.params.id);
    if (foundProject) {
      res.status(200).json(foundProject);
    } else {
      res
        .status(404)
        .json({errorMessage: `Project with ID of ${req.params.id} not found.`});
    }
  } catch (error) {
    res
      .status(500)
      .json({
        errorMessage: 'Error while retrieving the project from the database.'
      });
  }
});

module.exports = router;
