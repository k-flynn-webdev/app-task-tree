const logger = require('./logger.js')
const constants = require('../constants/index')
const config = require('../config/config')
const mailConfig = require('../config/config').mail
const mailgun = require('mailgun-js')({
  apiKey: mailConfig.api,
  domain: mailConfig.domain,
  host: mailConfig.host
})

// const templateAction = require('../mail/dist/action.html')
const pug = require('pug')

// Compile the source code
const createdUser = pug.compileFile('mail/dist/action.html');

let appTemp = null
let hasInit = false

function Init(app) {
  if (!hasInit) {
    appTemp = app

    const useMailService = (mailConfig.active === true &&
      config.node_env !== 'test')

    if (useMailService){
      app.on(constants.events.CREATE_ACCOUNT, AccountCreate)
      app.on(constants.events.UPGRADE_ACCOUNT, AccountCreate)
      app.on(constants.events.VERIFY_ACCOUNT, AccountVerify)
      app.on(constants.events.RESET_ACCOUNT, AccountReset)
      app.on(constants.events.UPDATED_ACCOUNT, AccountUpdate)
    }

    logger.Log(`\t✅ Email service\t${useMailService}`)

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
  const emailTextRender = mailConfig.strings.create.msg(user.name, user.verify, config.web.address, config.web.name)
  EmailSend({
    from: mailConfig.strings.create.from,
    to: user.email,
    subject: mailConfig.strings.create.subject,
    html: createdUser(emailTextRender),
    text: emailTextRender.text
  })
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
    text: templateAction })
    // text: mailConfig.strings.verify.msg(user.verify, config.web.address)})
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
