const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Updates a user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userUpdate(input,  app) {
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

    if (has.hasAnItem(input.email)) {
      // changing email so force a verify update
      input.verify = token.Magic(userFound)
    }

    return user.Update(input)
  })
  .then(() => user.GetUserByID(input.id))
  .then(userObj => {
    const userObjTmp = mysqlVal(userObj)

    if (has.hasAnItem(input.email)) {
      app.emit(constants.events.VERIFY_ACCOUNT, userObjTmp)
    }

    app.emit(constants.events.UPDATED_ACCOUNT, userObjTmp)

    return user.SafeExport(userObjTmp)
  })
}

module.exports = userUpdate
