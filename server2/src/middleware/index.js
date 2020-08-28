// eslint-disable-next-line no-unused-vars

const logRequests = require('./logRequests');

module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  logRequests(app);
};
