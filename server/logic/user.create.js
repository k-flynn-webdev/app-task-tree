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

  return user.GetUserByEmail(input.email)
  .then(found => {
    if (found.length > 0) {
      throw { status: 401,
        message: constants.errors.EMAIL_IN_USE }
    }

    return true
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
    const userObjTmp = mysqlVal(userObj)

    return Promise.all( [
      Promise.resolve(userObjTmp),
      user.Update({
        id: userObjTmp.id,
        verify: token.Magic(userObjTmp)
      })])
  })
  .then(([userObj, updateResult]) => {

    app.emit(constants.events.CREATE_ACCOUNT, userObj)

    return user.SafeExport(userObj)
  })
}

module.exports = userCreate
