const morgan = require('morgan');

morgan.token('custom-date', function getCustomDate () {
  const dateIsos = new Date().toISOString().split('T')
  const dateSec = dateIsos[1].split('.')[0]
  return `${dateIsos[0]} - ${dateSec}|`
})

morgan.token('custom-method', function getCustomMethod (req) {
  return `${req.method.toLowerCase()}|`
})

module.exports = app => {
  const morganType = ':custom-date :custom-method :url :status :res[content-length] :remote-addr :response-time ms';
  app.use(morgan(morganType));
}
