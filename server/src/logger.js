const { createLogger, format, transports, container } = require('winston')
const DATE_FORMAT = { format: 'YYYY-MM-DD - HH:mm:ss' }

const GENERAL_FORMAT =
  format.combine(
    format.errors({ stack: true }),
    format.timestamp(DATE_FORMAT),
    format.printf(info => `${info.timestamp}| ${info.level}| ${info.message}`)
  )

const ACTIVITY_FORMAT =
  format.combine(
    format.errors({ stack: true }),
    format.timestamp(DATE_FORMAT),
    format.printf(info => `${info.timestamp}| ${info.message}`)
  )

const ERROR_FORMAT =
  format.combine(
    format.errors({ stack: true }),
    format.timestamp(DATE_FORMAT),
    format.prettyPrint(),
  )

const loggers = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: GENERAL_FORMAT,
  transports: [
    new transports.Console({ format: GENERAL_FORMAT }),
    new transports.File({
      format: GENERAL_FORMAT,
      filename: './log/log.log'
    }),
    new transports.File({
      filename: './log/err.log',
      level: 'error',
      format: ERROR_FORMAT,
    })
  ],
})

const loggersActivity = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: ACTIVITY_FORMAT,
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'info',
      filename: './log/activity.log',
    }),
  ],
})

module.exports = function (app) {
  app.log = (input) => loggers.log('info', input)
  app.log.info = (input) => loggers.log('info', input)
  app.log.error = (input) => loggers.log('error', input)
  app.log.activity = (input) => loggersActivity.log('info', input)

  return app
}

// TODO: setup file rotations and max file sizes for logs!
