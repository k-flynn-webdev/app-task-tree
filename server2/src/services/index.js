const users = require('./users/users.service.js');
const task = require('./task/task.service.js');
const project = require('./project/project.service.js');
const goal = require('./goal/goal.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(task);
  app.configure(project);
  app.configure(goal);
};
