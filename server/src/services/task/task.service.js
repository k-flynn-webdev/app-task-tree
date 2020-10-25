// Initializes the `task` service on path `/tasks`
const { Task } = require('./task.class');
const createModel = require('../../models/task.model');
const hooks = require('./task.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.task, new Task(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.task);

  service.hooks(hooks);
};
