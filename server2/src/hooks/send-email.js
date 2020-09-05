// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 *
 * Send an email via a hook call
 *
 * @param {email}   email   email data to send
 * @return {function(*): Promise<*>}
 */
const sendEmail = (email) => {
  return async context => {

    // todo we add templating here

    const emailTmp = {
      to: 'flynny85@gmail.com',
      from: 'hi@kubedev.co.uk',
      subject: 'testing',
      text: 'testing email test here'
    }

    return context.app.service('email').create(emailTmp)
      .then(res => context.app.log(res))
      .catch(err => context.app.log(err))
  }
}

module.exports = sendEmail
