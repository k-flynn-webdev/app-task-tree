const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')

module.exports = function (app) {

  /**
   * Create a anon user account and returns only the id
   *    this type of account can be upgraded in the future
   *    to a full account
   *    @params { no password, no email, no name }
   *    @return { id }
   */
  app.post('/api/user/anon', function (req, res) {

    let userObjTmp

    user.Create({  name: 'anon', email: 'anon', password: 'anon' })
    .then(({ insertId }) => user.GetUserByID(insertId))
    .then(userObj => {
      userObjTmp = mysqlVal(userObj)
      return userObjTmp
    })
    .then(userObj => {
      app.emit('ACCOUNT_CREATE_ANON', userObj)

      exit(res, 200, 'Success your Account is created',
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
