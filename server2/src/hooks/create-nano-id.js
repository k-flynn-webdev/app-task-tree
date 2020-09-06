const nanoid = require('nanoid').nanoid

/**
 * Adds a nano-id string to a field
 *    `IF` an email is present in the data payload
 *
 * @param {string}    name    name of field to add the nano-id string usually:[verify | recover]
 * @param {boolean}   force   Will add to the data object regardless of any checks
 * @return {function(*)}
 */
module.exports = (name, force) => {
  return context => {
    if (context.data && context.data.email || force) {
      context.data[name] = nanoid()
    }

    return context
  }
}
