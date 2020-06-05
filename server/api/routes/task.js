const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const taskMiddle = require('../middlewares/task.js')
const task = require('../../services/task.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')

module.exports = function (app) {

  /**
   * Create a task & return
   */

  app.post('/api/task/create', taskMiddle.Create, taskMiddle.Prepare, function (req, res) {
    // todo check for user token and integrate

    let taskObjTmp

    task.Create(req.body)
    .then(({ insertId }) => {
      return task.GetTaskByID(insertId)
    })
    .then(newTask => {
      taskObjTmp = mysqlVal(newTask)

      // todo update users
      // todo update projects

      return taskObjTmp
    })
    .then(taskObj => {
      logger.Log('Task created, id: ' + taskObj.id)
        exit(res, 200,
          'Success your task is created',
          { task: task.SafeExport(taskObj) })
    })
    .catch((err) => {
      logger.Log(err.message || err)
      exit(res, 401, 'error', err.message || err)
    })
  })

  // /**
  //  * Login a user account & return a token key
  //  */
  // app.post('/api/user/login', userMiddle.Login, userMiddle.Prepare, function (req, res) {
  //
  //   let userObjTmp = null
  //
  //   user.GetUserByEmail(req.body.email)
  //   .then((userObj) => {
  //     if (!userObj || userObj.length < 1) {
  //       throw new Error('Account does not exist, please contact support.')
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //     return user.ComparePassword(req.body.password, userObjTmp.password)
  //   })
  //   .then((dbData) => {
  //     return user.Update({ id: userObjTmp.id, login: true })
  //   })
  //   .then((dbData) => {
  //     app.emit('ACCOUNT_LOGIN', userObjTmp)
  //
  //     exit(res, 200, 'Success Account login.', {
  //       account: user.SafeExport(userObjTmp),
  //       token: token.Create(userObjTmp) })
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 422, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Logout a user account & deny token from use
  //  */
  // app.get('/api/user/Logout', token.Logout, function (req, res) {
  //
  //   token.AddTokenToBlackList(req)
  //   .then((result) => {
  //
  //     app.emit('ACCOUNT_LOGOUT', result)
  //
  //     return exit(res, 201, result, result)
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 400, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Update a user account
  //  */
  // app.patch('/api/user', userMiddle.Update, token.Required, userMiddle.Prepare,
  //   function (req, res) {
  //
  //   let userObjTmp = null
  //
  //   user.GetUserByID(req.body.token.id)
  //   .then((userObj) => {
  //     if (!userObj || userObj.length < 1) {
  //       throw new Error('Account does not exist, please contact support.')
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.Item(userObjTmp.verify)){
  //       throw new Error('Account not verified, please verify first')
  //     }
  //
  //     if (has.Item(userObjTmp.recover)){
  //       throw new Error('Account was recently put in recovery mode, ' +
  //         'please contact support')
  //     }
  //
  //     req.body.id = userObjTmp.id
  //     return user.Update(req.body)
  //   })
  //   .then((dbUpdate) => {
  //       if (has.Item(req.body.email)) {
  //         let verifyString = token.Magic(userObjTmp)
  //         app.emit('ACCOUNT_VERIFY', userObjTmp)
  //
  //         return user.Update({ id: userObjTmp.id, verify: verifyString })
  //       }
  //   })
  //   .then(() => {
  //     return user.GetUserByID(req.body.token.id)
  //   })
  //   .then((userObj) => {
  //     userObjTmp = mysqlVal(userObj)
  //     app.emit('ACCOUNT_UPDATED', userObjTmp)
  //
  //     exit(res, 200, 'Success your account is updated',
  //       {
  //         account: user.SafeExport(userObjTmp),
  //         token: token.Create(userObjTmp)
  //       })
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 401, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Delete a user account & deny token from use
  //  */
  // app.delete('/api/user', token.Required, function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByID(req.body.token.id)
  //   .then((userObj) => {
  //     if (userObj.length < 1) {
  //       throw new Error('No account found with that ID')
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.Item(userObjTmp.verify)){
  //       throw new Error('Account not verified, please verify first')
  //     }
  //
  //     if (has.Item(userObjTmp.recover)){
  //       throw new Error('Account was recently put in recovery mode, ' +
  //         'please contact support')
  //     }
  //
  //     return user.Delete(userObjTmp.id)
  //   })
  //   .then((dbUpdate) => {
  //     token.AddTokenToBlackList(req)
  //     app.emit('ACCOUNT_DELETED', userObjTmp)
  //
  //     exit(res, 200, 'Success your account is deleted',
  //       {
  //         account: {},
  //         token: ''
  //       })
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 401, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Verify a users account, one time process to validate email
  //  */
  // app.get('/api/user/verify/:verify', userMiddle.Verify, userMiddle.Prepare,
  //   function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByVerify(req.params.verify)
  //   .then((userObj) => {
  //     if (userObj.length < 1) {
  //       throw new Error('Verify link does not exist, please contact support.')
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     return user.Update({ id: userObjTmp.id, verify: ' ' })
  //   })
  //   .then((dbUpdate) => {
  //     app.emit('ACCOUNT_VERIFIED', userObjTmp) // todo
  //
  //     exit(res, 200, 'Success Account verified',
  //       {
  //         account: user.SafeExport(userObjTmp),
  //         token: token.Create(userObjTmp)
  //       })
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 401, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * Triggers reset user password process via email,
  //  * will invalidate a account until the next stage is complete..
  //  */
  // app.post('/api/user/reset/', userMiddle.HasEmail, userMiddle.Prepare,
  //   function (req, res) {
  //
  //   let userObjTmp
  //
  //   user.GetUserByEmail(req.body.email)
  //   .then((userObj) => {
  //     if (userObj.length < 1) {
  //       throw new Error('Account does not exist, please contact support.')
  //     }
  //
  //     userObjTmp = mysqlVal(userObj)
  //
  //     if (has.Item(userObjTmp.verify)){
  //       throw new Error('Account not verified, please verify first')
  //     }
  //
  //     if (has.Item(userObjTmp.recover)){
  //       throw new Error('Account was recently put in recovery mode, ' +
  //         'please contact support')
  //     }
  //
  //     userObjTmp.recover = token.Magic(userObjTmp)
  //     return user.Update({ id: userObjTmp.id, recover: userObjTmp.recover })
  //   })
  //  .then((dbUpdate) => {
  //
  //     app.emit('ACCOUNT_RESET', userObjTmp)
  //
  //     return exit(res,
  //      200,
  //      'Success a reset email has been sent.')
  //   })
  //   .catch((err) => {
  //     logger.Log(err.message || err)
  //     exit(res, 401, 'error', err.message || err)
  //   })
  // })
  //
  // /**
  //  * User reset password with the above token
  //  */
  // app.patch('/api/user/reset/:recover',
  //   userMiddle.Recover, userMiddle.HasPassword, userMiddle.Prepare,
  //   function (req, res) {
  //
  //     let userObjTmp
  //
  //     user.GetUserByRecover(req.params.recover)
  //     .then((userObj) => {
  //       if (userObj.length < 1) {
  //         throw new Error(
  //           'Recovery link does not exist, please contact support.')
  //       }
  //
  //       userObjTmp = mysqlVal(userObj)
  //
  //       app.emit('ACCOUNT_VERIFIED', userObjTmp)
  //       return user.Update({
  //         id: userObjTmp.id,
  //         password: req.body.password,
  //         recover: ' ',
  //         verify: ' '
  //       })
  //     }).then((dbUpdate) => {
  //       return exit(res,
  //         200,
  //         'Success a new password has been set, please relogin.')
  //     }).catch((err) => {
  //       logger.Log(err.message || err)
  //       exit(res, 401, 'error', err.message || err)
  //     })
  //   })

  return app
}
