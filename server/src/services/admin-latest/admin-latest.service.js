// Initializes the `admin-latest` service on path `/admin-latest`
const { AdminLatest } = require('./admin-latest.class');
const hooks = require('./admin-latest.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  const constants = app.get('constants')

  // Initialize our service with any options it requires
  app.use(constants.path.adminlatest, new AdminLatest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service(constants.path.adminlatest);

  service.hooks(hooks);
};
