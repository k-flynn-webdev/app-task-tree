const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Creates a anon user &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   user info [ANON, ANON, ANON]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userAnonCreate(input, app) {
  return user.Create({
    name: constants.roles.ANON,
    email: constants.roles.ANON,
    password: constants.roles.ANON,
    role: constants.roles.ANON
  })
  .then(({ insertId }) => user.GetUserByID(insertId))
  .then(userObj => mysqlVal(userObj))
  .then(userObj => {
    app.emit(constants.events.CREATE_ANON_ACCOUNT, userObj)

    const userSafe = user.SafeExport(userObj)
    userSafe.meta = { created: userObj.created }

    return userSafe
  })
}

module.exports = userAnonCreate
