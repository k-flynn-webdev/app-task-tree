const path = require('path')
const logger = require('../services/logger.js')

function InitExceptions(app) {

  process.on('uncaughtException', (error, promise) => {
    logger.Log(error)

    process.exit(1) // exit application
  })

  return app
}

module.exports = InitExceptions
