const path = require('path')
const logger = require('../services/logger.js')

function InitExit(app) {

  process.on('exit', (error, promise) => {
    logger.Log(error)

    // todo things on nodejs exit

    process.exit(1) // exit application
  })

  return app
}

module.exports = InitExit
