'use strict'
process.stdout.write('\n')

const path = require('path')
const express = require('express')
const config = require('./config/config.js')
const logger = require('./services/logger.js')
const LoadAllModules = require('./loaders/loaders.js')

const app = express()

// Temp for devving
if (config.node_env === 'development') {
  const history = require('connect-history-api-fallback')
  app.use(history({
    rewrites: [{
        from: /^\/api\/.*$/,
        to: function(context) { return context.parsedUrl.pathname }
      }]
  }))
  app.use(express.static('public'))
}

function StartServer() {
  app.listen(config.port, err => {

    if (err) {
      logger.Log(err, { id: 'start' })
      process.exit(1)
      return
    }

    process.stdout.write(`
    ################################################
      App: ${config.web.name}
      Server listening: ${config.ip}:${config.port}
      - mode: ${config.node_env}
    ################################ ver: ${config.version} ####\n\n`)
  })
}

function Start() {

  console.time('LoadAllModules')

  return LoadAllModules(app)
  .then(() => {
    console.log('')
    console.timeEnd('LoadAllModules')
  })
  .catch((err) => {
    logger.Log(err, { id: 'start' })
    process.exit(1)
  })
  .finally(() => {
    StartServer()
  })

}

Start()

module.exports = app // For testing




