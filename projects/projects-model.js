const db = require('../data/dbConfig.js');

module.exports = {
  getProjects,
  getProjectById,
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

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => {
      return getProjectById(id);
    });
}
