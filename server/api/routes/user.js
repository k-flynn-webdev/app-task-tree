const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')

module.exports = function (app) {

  app.post('/api/user/byemail', function (req, res) {

    user.GetUserByEmail(req.body.email)
    .then(found => {
      return exit(res, 201, 'success', { data: found })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 400, 'error', err.message || err)
    })
  })


  /**
   * Create a user account & return a token key
   */
  app.post('/api/user', userMiddle.Create, prepareMiddle, function (req, res) {

    let userObjTmp

    user.GetUserByEmail(req.body.email)
    .then(found => {
      if (found.length > 0) {
        throw new Error('Email already in use.')
      }

      return user.Create(req.body)
    })
    .then(({ insertId }) => user.GetUserByID(insertId))
    .then(userObj => {
      userObjTmp = mysqlVal(userObj)
      userObjTmp.verify = token.Magic(userObj)

      return user.Update({ id: userObjTmp.id, verify: userObjTmp.verify })
    })
    .then(() => {
      app.emit('ACCOUNT_CREATE', userObjTmp)

      exit(res, 200, 'Success your Account is created',
        {
          account: user.SafeExport(userObjTmp),
          token: token.Create(userObjTmp)
        })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Login a user account & return a token key
   */
  app.post('/api/user/login', userMiddle.Login, prepareMiddle, function (req, res) {

    let userObjTmp = null

    user.GetUserByEmail(req.body.email)
    .then(userObj => {
      if (!userObj || userObj.length < 1) {
        throw new Error('Account does not exist, please contact support.')
      }

      userObjTmp = mysqlVal(userObj)
      return user.ComparePassword(req.body.password, userObjTmp.password)
    })
    .then(() => user.Update({ id: userObjTmp.id, login: true }))
    .then(() => {
      app.emit('ACCOUNT_LOGIN', userObjTmp)

      exit(res, 200, 'Success Account login.', {
        account: user.SafeExport(userObjTmp),
        token: token.Create(userObjTmp) })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 422, 'error', err.message || err)
    })
  })

  /**
   * Logout a user account & deny token from use
   */
  app.get('/api/user/Logout', token.Logout, function (req, res) {

    token.AddTokenToBlackList(req)
    .then(result => {

      app.emit('ACCOUNT_LOGOUT', result)

      return exit(res, 201, result, result)
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 400, 'error', err.message || err)
    })
  })

  /**
   * Update a user account
   */
  app.patch('/api/user', userMiddle.Update, token.Required, prepareMiddle,
    function (req, res) {

    let userObjTmp = null

    user.GetUserByID(req.body.token.id)
    .then(userObj => {
      if (!userObj || userObj.length < 1) {
        throw new Error('Account does not exist, please contact support.')
      }

      userObjTmp = mysqlVal(userObj)

      if (has.hasAnItem(userObjTmp.verify)){
        throw new Error('Account not verified, please verify first')
      }

      if (has.hasAnItem(userObjTmp.recover)){
        throw new Error('Account was recently put in recovery mode, ' +
          'please contact support')
      }

      req.body.id = userObjTmp.id
      return user.Update(req.body)
    })
    .then(() => {
        if (has.hasAnItem(req.body.email)) {
          let verifyString = token.Magic(userObjTmp)
          app.emit('ACCOUNT_VERIFY', userObjTmp)

          return user.Update({ id: userObjTmp.id, verify: verifyString })
        }
    })
    .then(() => user.GetUserByID(req.body.token.id))
    .then(userObj => {
      userObjTmp = mysqlVal(userObj)
      app.emit('ACCOUNT_UPDATED', userObjTmp)

      exit(res, 200, 'Success your account is updated',
        {
          account: user.SafeExport(userObjTmp),
          token: token.Create(userObjTmp)
        })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Delete a user account & deny token from use
   */
  app.delete('/api/user', token.Required, function (req, res) {

    let userObjTmp

    user.GetUserByID(req.body.token.id)
    .then(userObj => {
      if (userObj.length < 1) {
        throw new Error('No account found with that ID')
      }

      userObjTmp = mysqlVal(userObj)

      if (has.hasAnItem(userObjTmp.verify)){
        throw new Error('Account not verified, please verify first')
      }

      if (has.hasAnItem(userObjTmp.recover)){
        throw new Error('Account was recently put in recovery mode, ' +
          'please contact support')
      }

      return user.Delete(userObjTmp.id)
    })
    .then(() => {
      token.AddTokenToBlackList(req)
      app.emit('ACCOUNT_DELETED', userObjTmp)

      exit(res, 200, 'Success your account is deleted',
        {
          account: {},
          token: ''
        })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Verify a users account, one time process to validate email
   */
  app.get('/api/user/verify', userMiddle.Verify, prepareMiddle,
    function (req, res) {

    let userObjTmp

    user.GetUserByVerify(req.query.verify)
    .then(userObj => {
      if (userObj.length < 1) {
        throw new Error('Verify link does not exist, please contact support.')
      }

      userObjTmp = mysqlVal(userObj)

      return user.Update({ id: userObjTmp.id, verify: ' ' })
    })
    .then(() => {
      app.emit('ACCOUNT_VERIFIED', userObjTmp) // todo

      exit(res, 200, 'Success Account verified',
        {
          account: user.SafeExport(userObjTmp),
          token: token.Create(userObjTmp)
        })
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * Triggers reset user password process via email,
   * will invalidate a account until the next stage is complete..
   */
  app.post('/api/user/reset', userMiddle.Email, prepareMiddle,
    function (req, res) {

    let userObjTmp

    user.GetUserByEmail(req.body.email)
    .then(userObj => {
      if (userObj.length < 1) {
        throw new Error('Account does not exist, please contact support.')
      }

      userObjTmp = mysqlVal(userObj)

      if (has.hasAnItem(userObjTmp.verify)){
        throw new Error('Account not verified, please verify first')
      }

      if (has.hasAnItem(userObjTmp.recover)){
        throw new Error('Account was recently put in recovery mode, ' +
          'please contact support')
      }

      userObjTmp.recover = token.Magic(userObjTmp)
      return user.Update({ id: userObjTmp.id, recover: userObjTmp.recover })
    })
   .then(() => {

      app.emit('ACCOUNT_RESET', userObjTmp)

      return exit(res,
       200,
       'Success a reset email has been sent.')
    })
    .catch(err => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  /**
   * User reset password with the above token
   */
  app.patch('/api/user/reset',
    userMiddle.Recover, userMiddle.Email, prepareMiddle,
    function (req, res) {

      let userObjTmp

      user.GetUserByRecover(req.query.recover)
      .then(userObj => {
        if (userObj.length < 1) {
          throw new Error(
            'Recovery link does not exist, please contact support.')
        }

        userObjTmp = mysqlVal(userObj)

        app.emit('ACCOUNT_VERIFIED', userObjTmp)
        return user.Update({
          id: userObjTmp.id,
          password: req.body.password,
          recover: ' ',
          verify: ' '
        })
      })
      .then(() => {
        return exit(res,
          200,
          'Success a new password has been set, please re-login.')
      })
      .catch(err => {
        logger.Log(err.message || err)
        exit(res, 401, 'error', err.message || err)
      })
    })

  return app
}
