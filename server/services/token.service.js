const jwt = require('jsonwebtoken')

const logger = require('./logger.js')
const exit = require('../services/exit.js')
const config = require('../config/config.js')
const db = require('../interfaces/db_init_sql.js')
const MysqlVal = require('../helpers/MYSQL_value.js')

let tokensBlackListed = []
const magicLinkSetup = [10, 60]

const ERROR = 'error'
const DB_TOKENS = 'tokens'
const DB_READY = 'db-ready'
const DB_READY_TOKENS = 'db-ready-tokens'
const DB_SHOW_TOKENS = 'SELECT * FROM tokens'
const DB_CREATE_TOKEN = 'INSERT INTO tokens SET ?'
const DB_DELETE_TOKEN = 'DELETE FROM tokens WHERE id = ?'
const DB_CREATE_TOKENS_TABLE = 'CREATE TABLE tokens ' +
  '(id int auto_increment primary key, token VARCHAR(300) not null) ' +
  'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci'

function InitTokens() {
  return db.InitTable(DB_TOKENS, DB_CREATE_TOKENS_TABLE, DB_READY_TOKENS)
}

function CheckOldTokens() {
  return db.Query(DB_SHOW_TOKENS)
  .then((items) => {
    let oldTokens = []
    let blackTokens = []

    for (let i = 0, j = items.length; i < j; i++) {
      jwt.verify(items[i].token, config.token.secret, ((err, result) => {
        if (err) {
          oldTokens.push(items[i].id)
        } else {
          blackTokens.push(items[i].token.toString())
        }
      }))
    }

    tokensBlackListed = blackTokens
    logger.Log(tokensBlackListed.length + ' Tokens loaded')
    return oldTokens
  })
  .then((oldTokens) => {
    let allDBPromises = []

    oldTokens.forEach(item => {
      allDBPromises.push(db.Query(DB_DELETE_TOKEN, [item]))
    });

    Promise.all(allDBPromises)
    .then((items) => {
      let deletedItems = items !== undefined ? items.length : 0
      logger.Log(deletedItems + ' Tokens expired & removed')
    })
  })
  .catch((err) => {
    logger.Log(err.message || err)
  })
}

function Init(app) {
  app.on(DB_READY, InitTokens)
  app.on(DB_READY_TOKENS, CheckOldTokens)
}

exports.Init = Init

/**
 * Returns a json web magic token object from a user id
 *
 * @param   {object}  userObj   user object (name, email)
 * @return  {string}            token string snipped
 */
function Magic(userObj) {
  return jwt.sign({
      name: userObj.name,
      email: userObj.email,
      time: Date.now()},
    'magic-links-token')
  .toString().substring(magicLinkSetup[0], magicLinkSetup[1])
}

exports.Magic = Magic

/**
 * Returns a jsonweb token object from a user object
 *
 * @param   {object}  user  user data
 * @return  {string}  token string
 */
function Create({ id, name, email, role }) {
  return jwt.sign({ id, name, email, role, time: Date.now() },
    config.token.secret, { expiresIn: config.token.expires })
}

exports.Create = Create

/**
 * Returns cleaned up token (removes bearer string)
 *
 * @return {string}
 */
function TokenCleanUp(token) {
  let tmp = token
  let bearer = 'Bearer'
  let bearerIndex = tmp.indexOf(bearer)
  if (bearerIndex !== -1) { // is present
    let tmp2 = tmp.split(bearer)
    tmp = tmp2[1].trim()
  } else {
    return null
  }

  return tmp
}

/**
 * @return {null}
 */
function TokenHeader(req) {

  let token = null

  if (req && req.headers && req.headers.authorization) {
    token = TokenCleanUp(req.headers.authorization)
  }

  if (token) {
    token = token.toString()
  }

  return token
}

/**
 * @return {boolean}
 */
function TokenBlackListCheck(token) {
  let exists = tokensBlackListed.filter(item => item === token)

  if (exists.length > 0) {
    logger.Log(`Token previously consumed: ${token}`)
  }

  return exists.length > 0
}

/**
 * Used for decoding, NOT verifying, used only by the Logout route
 * @param token
 * @param req
 * @param res
 * @param next
 */
function TokenDecode(token, req, res, next) {
  let decoded = jwt.decode(token)

  if (!decoded) {
    let err = new Error('Token issued appears broken')
    logger.Log(err, req)
    return next(err)
  }

  decoded.logout = true

  req.body = Object.assign(req.body, { token: decoded })
  return next()
}

function TokenVerify(token, req, res, next) {
  jwt.verify(token, config.token.secret, function (error, decoded) {

    if (error) {
      logger.Log(error, req)
      if (error.message === 'jwt expired') {
        // todo send user to relogin!
        return exit(res, 401, error.name || error, 'Please relogin.')
      } else {
        return exit(res, 401, error.name || error, 'Please relogin.')
      }
    }

    req.body = Object.assign(req.body, { token: decoded })

    return next()
  });
}

/**
 * If a token has expired will not error but will continue so the user can be logged out regardless
 *
 * @param req
 * @param res
 * @param next
 */
function Logout(req, res, next) {

  let token = TokenHeader(req)

  if (!token || token.length < 100) {
    return exit(res, 401, 'Token Required, please login.')
  }

  TokenDecode(token, req, res, next)
}

exports.Logout = Logout

function Required(req, res, next) {

  let token = TokenHeader(req)

  if (!token || token.length < 100) {
    return exit(res, 401, 'Token Required, please login.')
  }

  // todo if checking as user/admin make sure token isn't null here!! === invalid token

  if (TokenBlackListCheck(token)) {
    return exit(res, 401, 'Token previously consumed.')
  }

  TokenVerify(token, req, res, next)

}

exports.Required = Required

function Passive(req, res, next) {

  let token = TokenHeader(req)

  if (!token || token.length < 100) {
    return next()
  }

  // todo if checking as user/admin make sure token isn't null here!! === invalid token

  if (TokenBlackListCheck(token)) {
    return exit(res, 401, 'Token previously consumed.')
  }

  TokenVerify(token, req, res, next)

}

exports.Passive = Passive

/**
 * Creates a token to blacklist in the db
 */
function AddTokenToBlackList(req) {

  let token = TokenHeader(req)

  if (!token || token.length < 100) {
    return Promise.reject('Invalid token received.')
  }

  let exists = tokensBlackListed.filter(item => item === token)

  if (exists.length > 0) {
    return Promise.reject('Token already exists.')
  }

  return db.Query(DB_CREATE_TOKEN, { token })
  .then((result) => {
    tokensBlackListed.push(token)
    logger.Log('New token added to blacklist.')
    return Promise.resolve('User logged out successfully.')
  })
  .catch(err => {
    logger.Log(err, req)
    return Promise.reject(err)
  })
}

exports.AddTokenToBlackList = AddTokenToBlackList

// todo Create unit tests for auth

