// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Attaches a message to the returned response
 *
 * @param {string}    type    Type of message
 * @param {boolean}   only    Return only this message
 * @return {Promise<*>}
 */

module.exports = (type, only = false ) => {
  return context => {

    const messageString = context.app.get('constants').message[type]

    let target = 'dispatch'
    if (!context.dispatch && context.result) { target = 'result' }

    if (only) {
      context[target] = { message: messageString }
    } else {
      context[target]['message'] = messageString
    }

    return context
  }
}
