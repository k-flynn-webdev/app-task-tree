const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')


module.exports = function (app) {

  /**
   * Create a anon user account and returns only the id
   *    this type of account can be upgraded in the future
   *    to a full account
   *    @params { no password, no email, no name }
   *    @return { id }
   */
  app.post(constants.paths.API_USER_ANON, function (req, res) {

    let userObjTmp

    user.Create({
      name: constants.vars.ANON,
      email: constants.vars.ANON,
      password: constants.vars.ANON
    })
    .then(({ insertId }) => user.GetUserByID(insertId))
    .then(userObj => {
      userObjTmp = mysqlVal(userObj)
      return userObjTmp
    })
    .then(userObj => {
      app.emit(constants.events.CREATE_ACCOUNT_ANON, userObj)

      exit(res, 200, constants.messages.SUCCESS_CREATED_ACCOUNT,
        {
          account: user.SafeExport(userObjTmp),
          token: ''
        })
    })
    .catch(err => {
      logger.Log(err.message || err, req)
      exit(res, 401, 'error', err.message || err)
    })
  })

  return app
}
