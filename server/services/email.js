const mailConfig = require('../config/config').mail
const logger = require('./logger.js')
const mailgun = require('mailgun-js')({
  apiKey: mailConfig.api,
  domain: mailConfig.domain,
  host: mailConfig.host
})

const ACCOUNT_RESET = 'ACCOUNT_RESET'
const ACCOUNT_VERIFY = 'ACCOUNT_VERIFY'
const ACCOUNT_CREATE = 'ACCOUNT_CREATE'
const ACCOUNT_UPDATE = 'ACCOUNT_UPDATE'

let appTemp = null
let hasInit = false

function Init(app) {
  if (!hasInit) {
    appTemp = app

    if (mailConfig.active){
      app.on(ACCOUNT_CREATE, AccountCreate)
      app.on(ACCOUNT_VERIFY, AccountVerify)
      app.on(ACCOUNT_RESET, AccountReset)
      app.on(ACCOUNT_UPDATE, AccountUpdate)
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
      return logger.Log(err)
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
    text: mailConfig.strings.create.msg(user.verify)})
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
    text: mailConfig.strings.verify.msg(user.verify)})
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
    text: mailConfig.strings.reset.msg(user.recover)})
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
    text: mailConfig.strings.update.msg(user.verify)})
}
