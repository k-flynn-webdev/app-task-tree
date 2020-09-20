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

    context.params.query = Object.keys(context.params.query)
      .reduce((acc, key) => {
        if (whitelist.includes(key)) {
          acc[key] = context.params.query[key]
        }

        return acc
      }, {})

    return context
  }
}
