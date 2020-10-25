// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Removes any items not provided in the whitelist array
 *      from the `params.query`
 *
 * @param {string[]}    whitelist    array of whitelisted queries
 * @return {Promise}
 */
module.exports = (whitelist) => {
  return context => {
    if (!context.params.provider) return context

    context.data = Object.keys(context.data)
      .reduce((acc, key) => {
        if (whitelist.includes(key)) {
          acc[key] = context.data[key]
        }

        return acc
      }, {})

    return context
  }
}
