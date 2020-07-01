const has = require('../helpers/has.js')
const user = require('../services/user.service.js')
const token = require('../services/token.service.js')
const mysqlVal = require('../helpers/MYSQL_value.js')
const constants = require('../constants')

/**
 * Creates a user account &
 *    runs the logic &
 *    returns the result
 *
 * @param {object}    input   account info [name, email, password]
 * @param {object}    app     express app
 * @returns {object}  userObj promise
 */
function userCreate(input,  app) {

  return user.GetUserByEmail(input)
  .then(found => {
    if (found.length > 0) {
      throw new Error(constants.errors.EMAIL_IN_USE)
    }

    return input
  })
  .then(() => {
    return user.Create({
      name: input.name,
      email: input.email,
      password: input.password
    })
  })
  .then(({ insertId }) => user.GetUserByID(insertId))
  .then(userObj => {
    return user.Update({
      id: userObj.id,
      verify: token.Magic(userObj)
    })
  })
  .then(userObj => {

    app.emit(constants.events.CREATE_ACCOUNT, userObj)

    return user.SafeExport(mysqlVal(userObj))
  })
}

module.exports = userCreate
