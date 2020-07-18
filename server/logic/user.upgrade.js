const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Upgrades a anon user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userUpgrade(input,  app) {

  input.role = constants.roles.USER

  if (has.hasAnItem(input.email)) {
    // changing email so force a verify update
    input.verify = token.Magic(input)
  }

  if (input.token.id.toString() !== input.id) {
    return Promise.reject({
      status: 401,
      message: 'ID mismatch'
    })
  }

  return user.GetUserByID(input.id)
  .then(usrFnd => {
    if (!has.hasAnItem(usrFnd)) {
      throw {
        status: 404,
        message: constants.errors.ACCOUNT_MISSING
      }
    }

    if (mysqlVal(usrFnd).role !== constants.roles.ANON) {
      throw {
        status: 400,
        message: constants.errors.ACCOUNT_ALREADY_UPGRADED
      }
    }
  })
  .then(() => user.Update(input))
  .then(() => user.GetUserByID(input.id))
  .then(userObj => {
    const userObjTmp = mysqlVal(userObj)

    if (has.hasAnItem(input.email)) {
      app.emit(constants.events.VERIFY_ACCOUNT, userObjTmp)
    }

    app.emit(constants.events.UPGRADE_ACCOUNT, userObjTmp)

    return user.SafeExport(userObjTmp)
  })
}

module.exports = userUpgrade
