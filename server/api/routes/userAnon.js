const has = require('../../helpers/has.js')
const exit = require('../../services/exit.js')
const logger = require('../../services/logger.js')
const userMiddle = require('../middlewares/user.js')
const config = require('../../config/config')
const user = require('../../services/user.service.js')
const token = require('../../services/token.service.js')
const mysqlVal = require('../../helpers/MYSQL_value.js')
const prepareMiddle = require('../middlewares/prepare.js')
const constants = require('../../constants/index')
// business
const userAnonCreateLogic = require('../../logic/user.anon.create.js')
const userUpgradeLogic = require('../../logic/user.upgrade.js')


module.exports = function (app) {


  if (config.node_env === 'development') {
    /**
     * Return a user token to continue using the api
     *  ONLY FOR DEV USE
     */
    app.get('/api/GetUser/:user',
      function (req, res) {

        user.GetUserByID(Number(req.params.user)).then(userObj => {
          const userFound = mysqlVal(userObj)

          if (!has.hasAnItem(userObj)) {
            throw {
              status: 404,
              message: constants.errors.ACCOUNT_MISSING
            }
          }

          exit(res, 200,
            constants.messages.SUCCESS,
            { token: token.Create(userFound),
          account: user.SafeExport(userFound) })
        }).catch(err => {
          logger.Log(err.message || err, req)
          exit(res, 400, err || 'error')
        })
      })
  }

  /**
   * Return a anon token to continue using the api
   *
   *    @params { user }
   *    @query { created }
   *    @return { id }
   */
  app.get(constants.paths.API_USER_ANON + '/:user',
    userMiddle.HasParam,
    prepareMiddle,
    function (req, res) {

      user.GetUserByID(Number(req.params.user))
      .then(userObj => {
        const userFound = mysqlVal(userObj)

        if (!has.hasAnItem(userObj) ||
          userFound.role !== constants.roles.ANON ||
          !has.hasAnItem(req.query.created)) {
          throw {
            status: 404,
            message: constants.errors.ACCOUNT_MISSING
          }
        }

        if (req.query.created.toString() !==
          new Date(userFound.created).toISOString()) {
          throw {
            status: 404,
            message: constants.errors.ACCOUNT_MISSING
          }
        }

        exit(res, 200,
          constants.messages.SUCCESS,
          { token: token.Create(userFound) })
      })
      .catch(err => {
        logger.Log(err.message || err, req)
        exit(res, 400, err || 'error')
      })
    })

  /**
   * Create a anon user account
   *    this type of account can be upgraded to a full account
   *    @params { no password, no email, no name }
   *    @return { id }
   */
  app.post(constants.paths.API_USER_ANON,
    function (req, res) {

      userAnonCreateLogic(req.body, app)
      .then(userObj => {

        logger.Log(constants.messages.SUCCESS_CREATED_ANON_ACCOUNT, req, userObj)

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
