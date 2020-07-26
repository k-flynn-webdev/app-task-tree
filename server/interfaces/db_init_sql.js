const mysql = require('mysql')

const config = require('../config/config.js')
const logger = require('../services/logger.js')
const MysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_USE = 'USE '
const DB_READY = 'db-ready'
const DB_SHOW = 'SHOW DATABASES'
const DB_CREATE = 'CREATE DATABASE '
const DB_SHOW_TABLES = 'SHOW TABLES'
const DB_POST_SETTINGS = ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci '

let appTemp = null
let connection = null

function Init(app) {
  appTemp = app
  connection = Connect()

  return FindDB()
  .then((dbFound) => {
    if (!dbFound) {
      return CreateDB()
    }
  })
 .then(() => {
    return SelectDB(config.db.database)
 })
}

exports.Init = Init

function Query(search, params) {
  return new Promise((resolve, reject) => {
    connection.query(search, params, (err, res) => {
      if (err) {
        if (config.node_env === 'development') {
          console.log(err)
        }
        return reject(err)
      }

      return resolve(res)
    })
  })
}

exports.Query = Query

function Close() {
  if (!connection) return
  connection.end()
  logger.Log('db closed')
}

exports.Close = Close

/**
 * Helps with Initilising a table/service
 *    if the table doesn't exist it will be created
 *    when the table is found, an event is emitted.
 *
 * @param {string}  tableToFind     table name to find
 * @param {string}  tableCreation   table creation instructions
 * @param {string}  tableReady      event to fire when ready
 * @returns {Promise}
 */
function InitTable(tableToFind, tableCreation, tableReady) {
  return FindTable(tableToFind)
  .then((tableFound) => {
    if (!tableFound) {
      return CreateTable(tableCreation)
    }
  })
  .then(()=> {
    appTemp.emit(tableReady)
  })
}

exports.InitTable = InitTable

function Connect() {

  connection = mysql.createConnection({
    host: config.db.url,
    port: config.db.port,
    user: config.db.user,
    password: config.db.pass,
    charset : 'utf8mb4',
  })

  connection.connect(function (err) {
    if (err) {
      logger.Log('Error connecting ' + err)
      errorHandler(err)
    }
    // logger.Log('db connected')
  })

  connection.on(ERROR, errorHandler)

  //   // todo make sure the exit process runs ???
  //   app.on('exit', () => {
  //     Close();
  //   });
  //
  //   // todo make sure the exit process runs ???
  //   process.on('exit', () => {
  //     Close();
  //   });

  return connection
}

exports.Connect = Connect


function errorHandler(err) {
  logger.Log('MySQL error ' + err)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    logger.Log('MySQL connection lost. Reconnecting.')
    connection = Connect()
    return SelectDB(config.db.database)
  } else if (err.code === 'ECONNREFUSED') {
    logger.Log('MySQL connection refused. Trying again in 3 seconds.')
    setTimeout(function () {
      connection = Connect()
      return SelectDB(config.db.database)
    }, 3000)
  }
}

function CreateDB() {
  return Query(DB_CREATE + config.db.database + DB_POST_SETTINGS)
}

function SelectDB(db) {
  return Query(DB_USE + db)
  .then(() => logger.Log('	✅ DB connected\t\t' + config.db.database))
  .then(() => {
    if (appTemp) { appTemp.emit(DB_READY) }
  })
}

exports.SelectDB = SelectDB

function FindDB(dbExists) {
  dbExists = false

  return Query(DB_SHOW)
  .then((result) => {
    result.forEach(item => {
      if (item.Database === config.db.database) {
        dbExists = true
      }
    })
    return dbExists
  })
}

function FindTable(table) {
  return Query(DB_SHOW_TABLES)
  .then((result) => {
    let tableExists = false
    result.forEach(item => {
      if (MysqlVal(item) === table) {
        tableExists = true
      }
    })
    return tableExists
  })
}

function CreateTable(tableInstructions) {
  return Query(tableInstructions)
}
