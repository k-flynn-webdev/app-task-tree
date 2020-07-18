const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')
// business
const userAnonCreateLogic = require('../../logic/user.anon.create.js')
const userUpgradeLogic = require('../../logic/user.upgrade.js')


module.exports = function (app) {

  /**
   * Create a anon user account and returns only the id
   *    this type of account can be upgraded in the future
   *    to a full account
   *    @params { no password, no email, no name }
   *    @return { id }
   */
  app.post(constants.paths.API_USER_ANON,
    function (req, res) {

      userAnonCreateLogic(req.body, app)
      .then(userObj => {

        logger.Log(constants.messages.SUCCESS_CREATED_ANON_ACCOUNT, req)

        exit(res, 201,
          constants.messages.SUCCESS_CREATED_ANON_ACCOUNT,
          { account: userObj,
            token: token.Create(userObj)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
  })

  /**
   * Upgrade a anon user account
   */
  app.patch(constants.paths.API_USER_UPGRADE,
    userMiddle.Upgrade,
    token.Required,
    prepareMiddle,
    function (req, res) {

      userUpgradeLogic(req.body, app)
      .then(userObj => {
        return Promise.all([userObj, token.AddTokenToBlackList(req)])
      })
      .then(([userObj, tokenAdded]) => {
        logger.Log(constants.messages.SUCCESS_UPGRADED_ACCOUNT, req)

        exit(res, 201,
          constants.messages.SUCCESS_UPGRADED_ACCOUNT,
          { account: userObj,
            token: token.Create(userObj)
          })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  return app
}
