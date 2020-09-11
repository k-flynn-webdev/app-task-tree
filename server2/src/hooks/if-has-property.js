const get = require('lodash').get;

/**
 * Do a action if a property is found on `context`
 *
 * @param {string}      property    name of field to check for
 *                                  can be 'name' or 'name.here.thing'
 *
 * @param {function}    action      action to execute if field exists
 * @return {function(*)}
 */
module.exports = (property, action) => {
  return context => {
    if (get(context, property, null)) {
      action(context)
    }

    return context
  }
}
