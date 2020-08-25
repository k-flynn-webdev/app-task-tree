// Initializes the `goal` service on path `/goals`
const { Goal } = require('./goal.class');
const createModel = require('../../models/goal.model');
const hooks = require('./goal.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/goals', new Goal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('goals');

  service.hooks(hooks);
};
