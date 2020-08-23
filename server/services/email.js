const logger = require('./logger.js')
const config = require('../config/config')
const mailConfig = require('../config/config').mail
const mailgun = require('mailgun-js')({
  apiKey: mailConfig.api,
  domain: mailConfig.domain,
  host: mailConfig.host
})

let hasInit = false
let useMailService = false

function Init() {
  if (!hasInit) {

    useMailService = (mailConfig.active === true &&
      config.node_env !== 'test')

    logger.Log(`\t✅ Email service\t${useMailService}`)

    hasInit = true
  }
}

exports.Init = Init

/**
 * Send an email via the API
 *
 * @param {Email}   emailData   email data to send
 * @returns {boolean|Error}
 */
const sendEmail = (emailData) => {
  if (!useMailService) return

  mailgun.messages().send(emailData, (err, result) => {

    if (err) {
      logger.Log('email err\n')
      logger.Log(err.statusCode + '\n')
      logger.Log(err)
      return err
    }

    logger.Log(result.id)
    logger.Log(result.message)
    return true
  })
}
exports.sendEmail = sendEmail


/**
 * @typedef {object} Email
 *
 * @property {string}   from      From email address
 * @property {string}   to        To email address
 * @property {string}   subject   Subject text
 * @property {string}   [text]    Basic text version of the email
 * @property {string}   [html]    HTML of the email
 */
