'use strict'
process.stdout.write('\n')

const path = require('path')
const express = require('express')
const config = require('./config/config.js')
const logger = require('./services/logger.js')
const LoadAllModules = require('./loaders/loaders.js')

const app = express()

// Temp for devving
if (process.env.NODE_ENV === 'development') {
  app.use(express.static('public'))
}

function StartServer() {
  app.listen(config.port, err => {

    if (err) {
      logger.Log(err)
      process.exit(1)
      return
    }

    process.stdout.write(`
    ################################################
      Server listening: ${config.ip}:${config.port}
      - mode: ${config.node_env}
    ################################ ver: ${config.version} ####\n`)
  })
}

function Start() {

  console.time('LoadAllModules')

  return LoadAllModules(app)
  .then(() => StartServer)
  .catch((err) => {
    logger.Log(err)
    process.exit(1)
    return
  })
  .finally(() => {
    console.log('')
    console.timeEnd('LoadAllModules')
    console.log('')
  })

}

module.exports = app // For testing

return Start()


