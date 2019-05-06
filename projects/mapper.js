module.exports = {
  intToBool,
  addActionsToProjects
};

function intToBool(int) {
  return int === 0 ? false : true;
}

function addActionsToProjects(action) {
  return {
    ...action,
    completed: intToBool(action.completed)
  };
}
