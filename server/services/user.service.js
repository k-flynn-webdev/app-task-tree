const bcrypt = require('bcrypt')
const sanitizer = require('sanitizer')
const logger = require('./logger.js')
const has = require('../helpers/has.js')
const config = require('../config/config.js')
const constants = require('../constants/index')
const db = require('../interfaces/db_init_sql.js')
const MysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_USERS = 'users'
const DB_READY = 'db-ready'
const DB_READY_USERS = 'db-ready-users'
const DB_SHOW_USERS = 'SELECT * FROM users ORDER BY created DESC'
const DB_CREATE_USER = 'INSERT INTO users SET ?'
const DB_GET_USER_BY_ID = 'SELECT * FROM users WHERE id = ?'
const DB_DELETE_USER_BY_ID = 'DELETE FROM users WHERE id = ?'
const DB_GET_USER_BY_EMAIL = 'SELECT * FROM users WHERE email = ?'
const DB_GET_USER_BY_VERIFY = 'SELECT * FROM users WHERE verify = ?'
const DB_GET_USER_BY_RECOVER = 'SELECT * FROM users WHERE recover = ?'

const DB_SET = ' SET'
const DB_SET_NAME = ' name = ?'
const DB_SET_EMAIL = ' email = ?'
const DB_SET_ROLE = ' role = ?'
const DB_SET_PASSWORD = ' password = ?'
const DB_SET_LOGIN = ' login = ?'
const DB_SET_UPDATED = ' updated = ?'
const DB_SET_VERIFY = ' verify = ?'
const DB_SET_RECOVER = ' recover = ?'
const DB_WHERE = ' WHERE id = ?'

const DB_CREATE_USERS_TABLE = 'CREATE TABLE users ' +
  '(id int auto_increment primary key, ' +
  'name VARCHAR(30) not null, ' +
  'email VARCHAR(30) not null, ' +
  'role VARCHAR(10) default "user" not null, ' +
  'password VARCHAR(100) not null, ' +
  'login DATETIME default now() not null, ' +
  'created DATETIME default now() not null, ' +
  'updated DATETIME default now() not null, ' +
  'verify VARCHAR(50) null, ' +
  'recover VARCHAR(50) null) ' +
  'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci'

// todo: future optimisation by indexing certain columns for quicker searches

ALL_QUERIES = {
  DB_READY_USERS,
  DB_SHOW_USERS,
  DB_CREATE_USER,
  DB_GET_USER_BY_ID,
  DB_DELETE_USER_BY_ID,
  DB_GET_USER_BY_EMAIL,
  DB_GET_USER_BY_VERIFY,
  DB_GET_USER_BY_RECOVER
}

exports.ALL_QUERIES = ALL_QUERIES

function InitUsers() {
  return db.InitTable(DB_USERS, DB_CREATE_USERS_TABLE, DB_READY_USERS)
}

function CheckUsers() {
  return getStats()
  .then(result => {
    logger.Log( 'Users')
    logger.Log( ` \t all \t ${result.all}`)
    logger.Log( ` \t anon \t ${result.anon}`)
    logger.Log( ` \t normal  ${result.normal}`)
    logger.Log( ` \t verify  ${result.verify}`)
    logger.Log( ` \t recover ${result.recover}`)
  })
}

function Init(app) {
  app.on(DB_READY, InitUsers)
  app.on(DB_READY_USERS, CheckUsers)
}

exports.Init = Init

function getStats () {
  return GetAllUsers()
  .then(items => {
    const anonUsers = items.filter(item => item.name === constants.roles.ANON).length
    const recoverUsers = items.filter(item => item.recover !== null || item.length > 5).length
    const verifyUsers = items.filter(item => item.verify !== null || item.length > 5).length
    const normalUsers = items.length - anonUsers
    return {
      all: items.length,
      anon: anonUsers,
      normal: normalUsers,
      verify: verifyUsers,
      recover: recoverUsers
    }
  })
}

exports.getStats = getStats

/**
 * Returns a new basic user object and saves to db
 *
 * @param   {object}  user data
 * @return  {object}  user object
 */
function Create({ name, email, password, verify= null ,role=constants.roles.USER }) {
  return CreatePassword(password)
  .then((hash) => db.Query(DB_CREATE_USER, { name, email, password: hash, role, verify }))
}

exports.Create = Create

/**
 * Updates a user object and saves to db
 *
 * @param   {object}  user data
 * @return  {object}  user object
 */
function Update({ id, name, email, role, password, verify, recover, login }) {
  const JOIN_CHAR = ','
  let tmpSQLVars = []
  let tmpSQLStart = 'UPDATE ' + DB_USERS + DB_SET
  let tmpSQLCommand = []

  function CreateSQLQuery() {
    return tmpSQLStart + tmpSQLCommand.join(JOIN_CHAR) + DB_WHERE
  }

  if (has.hasAnItem(login)) {
    tmpSQLCommand.push(DB_SET_LOGIN)
    tmpSQLVars.push(new Date())
    tmpSQLVars.push(id)
    return db.Query(CreateSQLQuery(), tmpSQLVars)
  }

  if (has.hasAnItem(name)) {
    tmpSQLCommand.push(DB_SET_NAME)
    tmpSQLVars.push(name.trim())
  }

  if (has.hasAnItem(email)) {
    tmpSQLCommand.push(DB_SET_EMAIL)
    tmpSQLVars.push(email)
  }

  if (has.hasAnItem(role)) {
    tmpSQLCommand.push(DB_SET_ROLE)
    tmpSQLVars.push(role)
  }

  if (has.hasAnItem(verify)) {
    tmpSQLCommand.push(DB_SET_VERIFY)
    if (!verify) {
      tmpSQLVars.push(undefined)
    } else {
      tmpSQLVars.push(verify.trim())
    }
  }

  if (has.hasAnItem(recover)) {
    tmpSQLCommand.push(DB_SET_RECOVER)
    if (!recover) {
      tmpSQLVars.push(undefined)
    } else {
      tmpSQLVars.push(recover.trim())
    }
  }

  tmpSQLCommand.push(DB_SET_UPDATED)
  tmpSQLVars.push(new Date())

  if (!has.hasAnItem(password)) {
    tmpSQLVars.push(id)
    return db.Query(CreateSQLQuery(), tmpSQLVars)
  } else {
    return CreatePassword(password)
    .then((hash) => {
      tmpSQLCommand.push(DB_SET_PASSWORD)
      tmpSQLVars.push(hash)
      tmpSQLVars.push(id)
      return db.Query(CreateSQLQuery(), tmpSQLVars)
    })
  }
}

exports.Update = Update

/**
 * Deletes a user object and updates the db
 *
 * @param   {int}     id  user id
 * @return  {object}  user object
 */
function Delete(id) {
  return db.Query(DB_DELETE_USER_BY_ID, [id])
}

exports.Delete = Delete

/**
 * Returns all users from the db
 *
 * @return  {Array}  all users found
 */
function GetAllUsers() {
  return db.Query(DB_SHOW_USERS)
}

// exports.GetAllUsers = GetAllUsers

/**
 * Returns a user object from the db if found via id int
 *
 * @param   {int}     id
 * @return  {object}  user object
 */
function GetUserByID(id) {
  return db.Query(DB_GET_USER_BY_ID, [id])
}

exports.GetUserByID = GetUserByID

/**
 * Returns a user object from the db if found via email
 *
 * @param   {string}  email
 * @return  {object}  user object
 */
function GetUserByEmail(email) {
  return db.Query(DB_GET_USER_BY_EMAIL, [email])
}

exports.GetUserByEmail = GetUserByEmail

/**
 * Returns a user object from the db if found via verify
 *
 * @param   {string}  verify
 * @return  {object}  user object
 */
function GetUserByVerify(verify) {
  return db.Query(DB_GET_USER_BY_VERIFY, [verify])
}

exports.GetUserByVerify = GetUserByVerify

/**
 * Returns a user object from the db if found via recover
 *
 * @param   {string}  recover
 * @return  {object}  user object
 */
function GetUserByRecover(recover) {
  return db.Query(DB_GET_USER_BY_RECOVER, [recover])
}

exports.GetUserByRecover = GetUserByRecover

/**
 * Create password hash, has to be done as async as the setter needs sync ><
 *
 * @param 		{string}		password
 * @returns 	{promise}		hash
 */
function CreatePassword(password) {
  return bcrypt.genSalt(config.secure.salt)
  .then(salt => bcrypt.hash(config.secure.hash + password, salt))
  .then(hash => Promise.resolve(hash))
  .catch(err => Promise.reject(err))
}

exports.CreatePassword = CreatePassword

/**
 * Compares the input against the test (db password)
 *
 * @param   {string}  input   user password
 * @param   {string}  dbHash  user db hash
 * @returns {Promise} on success returns  promise(true/false)
 */
function ComparePassword(input, dbHash) {
  return bcrypt.compare(config.secure.hash + input, dbHash)
  .then(passwordTest => {
    if (!passwordTest) {
      throw { status: 403,
        message: constants.errors.ACCOUNT_GENERIC_LOGIN_ERROR }
    }

    return Promise.resolve(true)
  })
}

exports.ComparePassword = ComparePassword

/**
 * Export a user model with only the items needed.
 *
 * @param 	{object}	userData  user data
 * @param 	{boolean}	meta      include meta
 * @returns {model}		          userModel minus items
 */
function SafeExport(userData, meta = false) {

  let freshUser = {}

  if (has.hasAnItem(userData.id)) {
    freshUser.id = userData.id
  }

  if (has.hasAnItem(userData.name)) {
    freshUser.name = sanitizer.unescapeEntities(userData.name)
  }

  if (has.hasAnItem(userData.email)) {
    freshUser.email = userData.email
  }

  if (has.hasAnItem(userData.role)) {
    freshUser.role = userData.role
  }

  freshUser.meta = {
    created: userData.created,
  }

  if (meta) {
    const hasRecover = (userData.recover && userData.recover.length > 0)
    const hasVerify = (userData.verify && userData.verify.length > 0)

    freshUser.meta = {
      created: userData.created,
      login: userData.login,
      updated: userData.updated,
      verified: ( userData.role !== constants.roles.ANON
        && !hasRecover && !hasVerify)
    }
  }

  return freshUser
}

exports.SafeExport = SafeExport
