// Initializes the `goal` service on path `/goals`
const { Plan } = require('./plan.class');
const createModel = require('../../models/plan.model');
const hooks = require('./plan.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.plan, new Plan(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.plan);

  service.hooks(hooks);
};
