// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const createEmail = require('../templates/user-create-email')

/**
 *
 * Send an email via a hook call
 *
 * @param {string}   template   email data to send
 * @return {function(*): Promise<*>}
 */
const sendEmail = (template) => {
  return async context => {

    // todo we add templating here
    if (!template) return Promise.reject('No email template given')
    // todo create a template object collection
    // if (!templates[template]) return Promise.reject('Template does not exist')

    const emailToSend = createEmail(context, context.result)

    return context.app.service('email').create(emailToSend)
      .then(res => context.app.log(res))
      .catch(err => context.app.log(err))
  }
}

module.exports = sendEmail
