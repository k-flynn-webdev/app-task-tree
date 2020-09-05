// Initializes the `test` service on path `/test`
const { Email } = require('./email.class')
const hooks = require('./email.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    active: app.get('mail').active,
    api: app.get('mail').api,
    domain: app.get('mail').domain,
    host: app.get('mail').host,
    from: app.get('mail').from
  }

  // Initialize our service with any options it requires
  app.use('/email', new Email(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('email')

  service.hooks(hooks)
};
