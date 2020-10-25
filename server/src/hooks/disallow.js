// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const errors = require('@feathersjs/errors')

module.exports = function (...providers) {
  return context => {
    const hookProvider = (context.params || {}).provider

    const anyProvider = providers.length === 0
    const thisProvider = providers.some(provider =>
      provider === hookProvider ||
      (provider === 'server' && !hookProvider) ||
      (provider === 'external' && !!hookProvider)
    )

    if (anyProvider || thisProvider) {
      throw new errors.MethodNotAllowed(
        `Provider '${context.params.provider}' can not call '${context.method}'. (disallow)`
      )
    }
  }
}
