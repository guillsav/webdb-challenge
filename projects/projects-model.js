const db = require('../data/dbConfig.js');

module.exports = {
  getProjects,
  getProjectById,
  getProjectActions,
  addProject
};

function getProjects() {
  return db('projects');
}

function getProjectById(id) {
  return db('projects')
    .where({id}, 'id')
    .first();
}

function getProjectActions(id) {
  return db('actions')
    .join('projects', 'projects.id', 'actions.project_id')
    .select(
      'actions.id',
      'actions.description',
      'actions.notes',
      'actions.completed'
    )
    .where('actions.project_id', id);
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => {
      return getProjectById(id);
    });
}
