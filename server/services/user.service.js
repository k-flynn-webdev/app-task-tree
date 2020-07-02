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
  return GetAllUser()
  .then((items) => {
    const anonUsers = items.filter(item => item.name === constants.vars.ANON).length
    const normalUsers = items.length - anonUsers
    logger.Log( 'Users found')
    logger.Log( ` \t anon: \t ${anonUsers}`)
    logger.Log( ` \t normal: ${normalUsers}`)
  })
}

function Init(app) {
  app.on(DB_READY, InitUsers)
  app.on(DB_READY_USERS, CheckUsers)
}

exports.Init = Init

/**
 * Returns a new basic user object and saves to db
 *
 * @param   {object}  user data
 * @return  {object}  user object
 */
function Create({ name, email, password }) {
  return CreatePassword(password)
  .then((hash) => db.Query(DB_CREATE_USER, { name, email, password: hash }))
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

  if (login) {
    tmpSQLCommand.push(DB_SET_LOGIN)
    tmpSQLVars.push(new Date())
    tmpSQLVars.push(id)
    return db.Query(CreateSQLQuery(), tmpSQLVars)
  }

  if (name) {
    tmpSQLCommand.push(DB_SET_NAME)
    tmpSQLVars.push(name.trim())
  }

  if (email) {
    tmpSQLCommand.push(DB_SET_EMAIL)
    tmpSQLVars.push(email)
  }

  if (role) {
    tmpSQLCommand.push(DB_SET_ROLE)
    tmpSQLVars.push(role)
  }

  if (verify) {
    tmpSQLCommand.push(DB_SET_VERIFY)
    tmpSQLVars.push(verify.trim())
  }

  if (recover) {
    tmpSQLCommand.push(DB_SET_RECOVER)
    tmpSQLVars.push(recover.trim())
  }

  tmpSQLCommand.push(DB_SET_UPDATED)
  tmpSQLVars.push(new Date())

  if (!password) {
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
 * Returns a jsonweb token object from a user object
 *
 * @return  {string}  token string
 */
function GetAllUser() {
  return db.Query(DB_SHOW_USERS)
}

exports.GetAllUser = GetAllUser

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
        message: constants.errors.PASSWORD_INCORRECT }
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

  if (meta) {
    freshUser.meta = {
      login: userData.login,
      created: userData.created,
      updated: userData.updated,
      verified: userData.verify.length < 1
    }
  }

  return freshUser
}

exports.SafeExport = SafeExport
