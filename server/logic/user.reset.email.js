const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Reset a user account password (start process) &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userResetEmail({ email },  app) {

  let userFound = null

  return user.GetUserByEmail(email)
  .then(usrFnd => {
    userFound = mysqlVal(usrFnd)

    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.ACCOUNT_MISSING
      }
    }

    const resetString = token.Magic(userFound)
    userFound.recover = resetString
    return user.Update({ id: userFound.id, recover: resetString })
  })
  .then(() => {

    app.emit(constants.events.RESET_ACCOUNT, userFound)

    return user.SafeExport(userFound)
  })
}

module.exports = userResetEmail
