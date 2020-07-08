const logger = require('./logger.js')
const constants = require('../constants/index')
const config = require('../config/config')
const mailConfig = require('../config/config').mail
const mailgun = require('mailgun-js')({
  apiKey: mailConfig.api,
  domain: mailConfig.domain,
  host: mailConfig.host
})

let appTemp = null
let hasInit = false

function Init(app) {
  if (!hasInit) {
    appTemp = app

    if (mailConfig.active &&
      config.node_env !== 'test'){
      app.on(constants.events.CREATE_ACCOUNT, AccountCreate)
      app.on(constants.events.VERIFY_ACCOUNT, AccountVerify)
      app.on(constants.events.RESET_ACCOUNT, AccountReset)
      app.on(constants.events.UPDATED_ACCOUNT, AccountUpdate)

      logger.Log('     ✅ Email service: true')
    }

    hasInit = true
  }
}

exports.Init = Init

/**
 * Email API
 *
 * @param emailData 	{Object}	data to send (from, to, subject, text)
 */
const EmailSend = (emailData) => {
  mailgun.messages().send(emailData, (err, result) => {

    if (err) {
      logger.Log('email err\n')
      logger.Log(err.statusCode + '\n')
      logger.Log(err)
      return
    }

    logger.Log(result.id)
    logger.Log(result.message)
  })
}

/**
 * Send a user account creation email
 *
 * @param user 	{Object}	user object
 */
const AccountCreate = (user) => {
  EmailSend({
    from: mailConfig.strings.create.from,
    to: user.email,
    subject: mailConfig.strings.create.subject,
    text: mailConfig.strings.create.msg(user.verify, config.web.address, config.web.name)})
}

/**
 * Send a user account verify email
 *
 * @param user 	{Object}	user object
 */
const AccountVerify = (user) => {
  EmailSend({
    from: mailConfig.strings.verify.from,
    to: user.email,
    subject: mailConfig.strings.verify.subject,
    text: mailConfig.strings.verify.msg(user.verify, config.web.address)})
}

/**
 * Send a user reset email
 *
 * @param user 	{Object}	user object
 */
const AccountReset = (user) => {
  EmailSend({
    from: mailConfig.strings.reset.from,
    to: user.email,
    subject: mailConfig.strings.reset.subject,
    text: mailConfig.strings.reset.msg(user.recover, config.web.address)})
}

/**
 * Inform a user has been updated
 *
 * @param user 	{Object}	user object
 */
const AccountUpdate = (user) => {
  EmailSend({
    from: mailConfig.strings.update.from,
    to: user.email,
    subject: mailConfig.strings.update.subject,
    text: mailConfig.strings.update.msg(user.verify, config.web.address)})
}
