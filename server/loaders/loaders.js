const routes = require('./routes.js')
const subscribers = require('./events.js')
const expressSettings = require('./express')
const logger = require('../services/logger.js')
const sSockets = require('./server_sockets.js')
const serviceInit = require('./init_service.js')
const interfaceInit = require('./init_interface.js')

function LoaderInit(app) {

  return new Promise((resolve, reject) => {

    logger.Init(app)

    let allPromises = []
    let allModulesToLoad = [
      expressSettings,
      interfaceInit,
      routes,
      sSockets,
      serviceInit,
      subscribers ]

    for (let i = 0; i < allModulesToLoad.length; i++) {
      allPromises.push(allModulesToLoad[i](app))
    }

    return Promise.all(allPromises)
    .then(() => resolve())
    .catch((err) => reject(err))
  })
}

module.exports = LoaderInit
