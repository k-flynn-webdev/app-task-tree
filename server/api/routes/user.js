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

        exit(res, 201,
          constants.messages.SUCCESS_CREATED_ACCOUNT,
          { account: userObj,
            token: token.Create(userObj)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err.message || 'error', err)
      })
  })

  // /**
  //  * Login a user account & return a token key
  //  */
  // app.post(constants.paths.API_USER_LOGIN,
  //   userMiddle.Login, prepareMiddle, function (req, res) {
  //
  //   let userObjTmp = null
  //
  //   user.GetUserByEmail(req.body.email)
  //   .then(userObj => {
  //     if (!userObj || userObj.length < 1) {
  //       throw new Error(constants.errors.ACCOUNT_MISSING)
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //     return user.ComparePassword(req.body.password, userObjTmp.password)
  //   })
  //   .then(() => user.Update({ id: userObjTmp.id, login: true }))
  //   .then(() => {
  //     app.emit(constants.events.LOGIN_ACCOUNT, userObjTmp)
  //
  //     exit(res, 200,
  //       constants.messages.SUCCESS_LOGIN_ACCOUNT,
  //       { account: user.SafeExport(userObjTmp),
  //       token: token.Create(userObjTmp) })
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Logout a user account & deny token from use
  //  */
  // app.get(constants.paths.API_USER_LOGOUT, token.Logout, function (req, res) {
  //
  //   token.AddTokenToBlackList(req)
  //   .then(result => {
  //
  //     app.emit(constants.events.LOGOUT_ACCOUNT, result)
  //
  //     return exit(res, 201, result, result)
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })

  // /**
  //  * Update a user account
  //  */
  // app.patch(constants.paths.API_USER, userMiddle.Update,
  //   token.Required, prepareMiddle, function (req, res) {
  //
  //   let userObjTmp = null
  //
  //   user.GetUserByID(req.body.token.id)
  //   .then(userObj => {
  //     if (!userObj || userObj.length < 1) {
  //       throw new Error(constants.errors.ACCOUNT_MISSING)
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.hasAnItem(userObjTmp.verify)){
  //       throw new Error(constants.errors.ACCOUNT_UNVERIFIED)
  //     }
  //
  //     if (has.hasAnItem(userObjTmp.recover)){
  //       throw new Error(constants.errors.ACCOUNT_IN_RECOVERY)
  //     }
  //
  //     req.body.id = userObjTmp.id
  //     return user.Update(req.body)
  //   })
  //   .then(() => {
  //       if (has.hasAnItem(req.body.email)) {
  //         let verifyString = token.Magic(userObjTmp)
  //         app.emit(constants.events.VERIFY_ACCOUNT, userObjTmp)
  //
  //         return user.Update({ id: userObjTmp.id, verify: verifyString })
  //       }
  //   })
  //   .then(() => user.GetUserByID(req.body.token.id))
  //   .then(userObj => {
  //     userObjTmp = mysqlVal(userObj)
  //     app.emit(constants.events.UPDATED_ACCOUNT, userObjTmp)
  //
  //     exit(res, 200,
  //       constants.messages.SUCCESS_UPDATED_ACCOUNT,
  //       { account: user.SafeExport(userObjTmp),
  //         token: token.Create(userObjTmp)
  //       })
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Delete a user account & deny token from use
  //  */
  // app.delete(constants.paths.API_USER, token.Required, function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByID(req.body.token.id)
  //   .then(userObj => {
  //     if (userObj.length < 1) {
  //       throw new Error(constants.errors.ACCOUNT_MISSING)
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.hasAnItem(userObjTmp.verify)){
  //       throw new Error(constants.errors.ACCOUNT_UNVERIFIED)
  //     }
  //
  //     if (has.hasAnItem(userObjTmp.recover)){
  //       throw new Error(constants.errors.ACCOUNT_IN_RECOVERY)
  //     }
  //
  //     return user.Delete(userObjTmp.id)
  //   })
  //   .then(() => {
  //     token.AddTokenToBlackList(req)
  //     app.emit(constants.events.DELETED_ACCOUNT, userObjTmp)
  //
  //     exit(res, 200, constants.messages.SUCCESS_DELETED_ACCOUNT,
  //       {
  //         account: {},
  //         token: ''
  //       })
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Verify a users account, one time process to validate email
  //  */
  // app.get(constants.paths.API_USER_VERIFY, userMiddle.Verify, prepareMiddle,
  //   function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByVerify(req.query.verify)
  //   .then(userObj => {
  //     if (userObj.length < 1) {
  //       throw new Error(constants.errors.VERIFY_LINK_MISSING)
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     return user.Update({ id: userObjTmp.id, verify: ' ' })
  //   })
  //   .then(() => {
  //     app.emit(constants.events.VERIFIED_ACCOUNT, userObjTmp) // todo
  //
  //     exit(res, 200,
  //       constants.messages.SUCCESS_VERIFIED_ACCOUNT,
  //       { account: user.SafeExport(userObjTmp),
  //         token: token.Create(userObjTmp)
  //       })
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Triggers reset user password process via email,
  //  * will invalidate a account until the next stage is complete..
  //  */
  // app.post(constants.paths.API_USER_RESET, userMiddle.Email, prepareMiddle,
  //   function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByEmail(req.body.email)
  //   .then(userObj => {
  //     if (userObj.length < 1) {
  //       throw new Error(constants.errors.ACCOUNT_MISSING)
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.hasAnItem(userObjTmp.verify)){
  //       throw new Error(constants.errors.ACCOUNT_UNVERIFIED)
  //     }
  //
  //     if (has.hasAnItem(userObjTmp.recover)){
  //       throw new Error(constants.errors.ACCOUNT_IN_RECOVERY)
  //     }
  //
  //     userObjTmp.recover = token.Magic(userObjTmp)
  //     return user.Update({ id: userObjTmp.id, recover: userObjTmp.recover })
  //   })
  //  .then(() => {
  //
  //     app.emit(constants.events.RESET_ACCOUNT, userObjTmp)
  //
  //     return exit(res, 200,
  //      constants.messages.SUCCESS_RESET_ACCOUNT)
  //   })
  //   .catch(err => {
  //     logger.Log(err.message || err, req)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * User reset password with the above token
  //  */
  // app.patch(constants.paths.API_USER_RESET,
  //   userMiddle.Recover, userMiddle.Email, prepareMiddle,
  //   function (req, res) {
  //
  //     let userObjTmp
  //
  //     user.GetUserByRecover(req.query.recover)
  //     .then(userObj => {
  //       if (userObj.length < 1) {
  //         throw new Error(constants.errors.RECOVERY_LINK_MISSING)
  //       }
  //
  //       userObjTmp = mysqlVal(userObj)
  //
  //       app.emit(constants.events.VERIFIED_ACCOUNT, userObjTmp)
  //       return user.Update({
  //         id: userObjTmp.id,
  //         password: req.body.password,
  //         recover: ' ',
  //         verify: ' '
  //       })
  //     })
  //     .then(() => {
  //       return exit(res,
  //         200,
  //         constants.messages.SUCCESS_PASSWORD_RESET_ACCOUNT)
  //     })
  //     .catch(err => {
  //       logger.Log(err.message || err, req)
  //       exit(res, 400, 'error', err.message || err)
  //     })
  //   })

  return app
}
