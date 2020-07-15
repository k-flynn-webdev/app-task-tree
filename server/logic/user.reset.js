const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Reset a user account password (confirmation) &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userReset({ reset, password },  app) {

  let userFound = null

  return user.GetUserByRecover(reset)
  .then(usrFnd => {
    userFound = mysqlVal(usrFnd)

    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.RECOVERY_LINK_MISSING
      }
    }

    return user.Update({ id: userFound.id, recover: false, password: password })
  })
  .then(() => {

    app.emit(constants.events.UPDATED_ACCOUNT, userFound)

    return user.SafeExport(userFound)
  })
}

module.exports = userReset
