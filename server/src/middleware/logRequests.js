const morgan = require('morgan');

module.exports = app => {
  const morganType = ':date[iso] :method :url :status :res[content-length] :remote-addr :response-time ms';
  app.use(morgan(morganType));
};
