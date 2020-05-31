const path = require('path')
// const mongoose = require('mongoose')

const config = require('../config/config.js')
const logger = require('../services/logger.js')

let db = null

// function Init(app) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(true)
//     }, 200)
//   })
  // db = mongoose.connect(config.db,
  //   { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
  //   if (error) {
  //     logger.Log('Error: db connecting error.' + error);
  //   }
  // });
  //
  // mongoose.connection.on('error', function (error) {
  //   if (error) {
  //     logger.Log('Error: db connection error.' + error);
  //   }
  // });
  //
  // mongoose.connection.on('disconnected', function () {
  //   logger.Log('Error: db disconnected/closed: ' + config.db + '._');
  //   Disconnect(app);
  // });
  //
  // mongoose.connection.on('connected', function () {
  //   Connect(app);
  //   logger.Log('	✅ DB connected : ' + config.db);
  //   return db;
  // });
// }

// exports.Init = Init

function Connect(app) {
  setTimeout(function () {
    app.emit('db-on')
  }, 3 * 1000)
}

function Disconnect(app) {
  app.emit('db-off')
}

