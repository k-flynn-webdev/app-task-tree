const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Login a user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userLogin(input,  app) {
  let userFound = null

  return user.GetUserByEmail(input.email)
  .then(usrFnd => {
    userFound = mysqlVal(usrFnd)

    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.ACCOUNT_GENERIC_LOGIN_ERROR
      }
    }

    return user.ComparePassword(input.password, userFound.password)
  })
  .then(() => {
    return user.Update({ id: userFound.id, login: true })
  })
  .then(() => {

    app.emit(constants.events.LOGIN_ACCOUNT, userFound)

    return user.SafeExport(userFound)
  })
}

module.exports = userLogin
