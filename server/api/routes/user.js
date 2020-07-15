const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')
// business
const userCreateLogic = require('../../logic/user.create.js')
const userUpdateLogic = require('../../logic/user.update.js')
const userDeleteLogic = require('../../logic/user.delete.js')
const userLoginLogic = require('../../logic/user.login.js')
const userVerifyLogic = require('../../logic/user.verify.js')
const userResetEmailLogic = require('../../logic/user.reset.email.js')
const userResetLogic = require('../../logic/user.reset.js')


module.exports = function (app) {

  /**
   * Create a user account & return a token key
   */
  app.post(constants.paths.API_USER,
    userMiddle.Create,
    prepareMiddle,
    function (req, res) {

      userCreateLogic(req.body, app)
      .then(userObj => {

        logger.Log(constants.messages.SUCCESS_CREATED_ACCOUNT, req)

        exit(res, 201,
          constants.messages.SUCCESS_CREATED_ACCOUNT,
          { account: userObj,
            token: token.Create(userObj)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
  })

  /**
   * Update a user account
   */
  app.patch(constants.paths.API_USER,
    userMiddle.Update,
    prepareMiddle,
    function (req, res) {

      userUpdateLogic(req.body, app)
      .then(userObj => {

        // todo blacklist old token
        logger.Log(constants.messages.SUCCESS_UPDATED_ACCOUNT, req)

        exit(res, 200,
          constants.messages.SUCCESS_UPDATED_ACCOUNT,
          { account: userObj,
            token: token.Create(userObj)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Delete a user account
   */
  app.delete(constants.paths.API_USER,
    userMiddle.Delete,
    prepareMiddle,
    function (req, res) {

      userDeleteLogic(req.body, app)
      .then(() => {

        // token.AddTokenToBlackList(req) // todo
        logger.Log(constants.messages.SUCCESS_DELETED_ACCOUNT, req)

        exit(res, 200,
          constants.messages.SUCCESS_DELETED_ACCOUNT,
          { account: null,
            token: null
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Login a user account & return a token key
   */
  app.post(constants.paths.API_USER_LOGIN,
    userMiddle.Login,
    prepareMiddle,
    function (req, res) {

    userLoginLogic(req.body, app)
    .then(userObj => {

      logger.Log(constants.messages.SUCCESS_LOGIN_ACCOUNT, req)

      exit(res, 200,
        constants.messages.SUCCESS_LOGIN_ACCOUNT,
        { account: userObj,
        token: token.Create(userObj) })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err || 'error')
    })
  })

  /**
   * Logout a user account & deny token from use
   */
  app.get(constants.paths.API_USER_LOGOUT,
    token.Logout,
    function (req, res) {

    user.GetUserByID(req.body.token.id)
    .then(() => {

      // token.AddTokenToBlackList(req) // todo
      logger.Log(constants.messages.SUCCESS_LOGOUT_ACCOUNT, req)

      app.emit(constants.events.LOGOUT_ACCOUNT, req.body.token.id)

      return exit(res, 200, constants.messages.SUCCESS_LOGOUT_ACCOUNT,
        { token: null, account: null })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 400, err || 'error')
    })
  })

  /**
   * Verify a user account
   */
  app.get(constants.paths.API_USER_VERIFY(),
    userMiddle.Verify,
    prepareMiddle,
    function (req, res) {

      userVerifyLogic(req.params, app)
      .then(userFound => {

        logger.Log(constants.messages.SUCCESS_VERIFIED_ACCOUNT, req)

        exit(res, 200,
          constants.messages.SUCCESS_VERIFIED_ACCOUNT,
          { account: userFound,
            token: token.Create(userFound)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Reset a user account
   *    begins reset process
   */
  app.get(constants.paths.API_USER_RESET(),
    userMiddle.Reset,
    prepareMiddle,
    function (req, res) {

      userResetEmailLogic({ email: req.params.reset }, app)
      .then(() => {

        logger.Log(constants.messages.SUCCESS_RESET_ACCOUNT, req)

        exit(res, 200,
          constants.messages.SUCCESS_RESET_ACCOUNT)
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Reset a user account
   *    final reset process
   */
  app.patch(constants.paths.API_USER_RESET(),
    userMiddle.Reset,
    prepareMiddle,
    function (req, res) {

      userResetLogic({
        reset: req.params.reset,
        password: req.body.password }, app)
      .then(() => {

        logger.Log(constants.messages.SUCCESS_PASSWORD_RESET_ACCOUNT, req)

        exit(res, 200,
          constants.messages.SUCCESS_PASSWORD_RESET_ACCOUNT)
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  return app
}
