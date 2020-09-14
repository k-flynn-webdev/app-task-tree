// Initializes the `verify` service on path `/verify`
const { Verify } = require('./verify.class');
const createModel = require('../../models/users.model');
const hooks = require('./verify.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.verify, new Verify(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.verify);

  service.hooks(hooks);
};
