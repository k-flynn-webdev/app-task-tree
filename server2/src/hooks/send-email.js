// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors');

const createEmail = require('../templates/user-create-email')

const TEMPLATES = {
  create: createEmail
}
/**
 *
 * Send an email via a hook call
 *
 * @param {string}   template   type of email data to send
 * @return {function(*): Promise<*>}
 */
const sendEmail = (template) => {
  return async context => {

    if (!template) return Promise.reject('No email template given')

    if (!TEMPLATES[template]) {
      const err = new BadRequest('Template does not exist', {})
      context.app.log(err)
      throw err
    }

    const emailToSend = TEMPLATES[template](context, context.result)

    return context.app.service('email').create(emailToSend)
      .then(res => context.app.log(res))
      .catch(err => context.app.log(err))
  }
}

module.exports = sendEmail
