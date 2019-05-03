const router = require('express').Router();
const db = require('./action-model.js');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const {description, project_id} = req.body;
    if (
      description.length > 0 &&
      description.length <= 128 &&
      project_id !== null
    ) {
      const newAction = await db.addAction(req.body);
      res.status(201).json(newAction);
    } else {
      res
        .status(400)
        .json({errorMessage: 'Please provide a description and a project ID'});
    }
  } catch (error) {
    res
      .status(500)
      .json({errorMessage: 'Error while adding the action to the database.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const actions = await db.getActions();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Error while retrieving the actions from the database.'
    });
  }
});

module.exports = router;
