const path = require('path')
const logger = require('../services/logger.js')

function InitRejections(app) {

  process.on('unhandledRejection', (error, promise) => {
    logger.Log(error)

    process.exit(1) // exit application
  })

  return app
}

module.exports = InitRejections
