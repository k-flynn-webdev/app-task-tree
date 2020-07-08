const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const user = require('../services/user.service.js')
const constants = require('../constants')
const has = require('../helpers/has.js')

/**
 * Deletes a user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userDelete(input,  app) {
  return user.GetUserByID(input.id)
  .then(usrFnd => {
    const userFound = mysqlVal(usrFnd)

    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.ACCOUNT_MISSING
      }
    }

    if (has.hasAnItem(userFound.verify)) {
      throw {
        status: 401,
        message: constants.errors.ACCOUNT_UNVERIFIED
      }
    }

    if (has.hasAnItem(userFound.recover)) {
      throw {
        status: 401,
        message: constants.errors.ACCOUNT_IN_RECOVERY
      }
    }

    return user.Delete(input.id)
  })
  .then(() => {

    app.emit(constants.events.DELETED_ACCOUNT, input)

    return input
  })
}

module.exports = userDelete
