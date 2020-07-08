const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Verify a user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userVerify({ verify },  app) {

  let userFound = null

  return user.GetUserByVerify(verify)
  .then(usrFnd => {
    userFound = mysqlVal(usrFnd)

    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.VERIFY_LINK_MISSING
      }
    }

    return user.Update({ id: userFound.id, verify: false })
  })
  .then(() => {

    app.emit(constants.events.VERIFIED_ACCOUNT, userFound)

    return user.SafeExport(userFound)
  })
}

module.exports = userVerify
