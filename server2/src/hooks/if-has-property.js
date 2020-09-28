const get = require('lodash').get;

/**
 * Do a action if a property exists on `context`
 *
 * @param {string}      property    name of field to check for
 *                                  can be 'name' or 'name.here.thing'
 *
 * @param {function|Array<function>}    action  action to execute if field exists
 * @return {function(*)}
 */
module.exports = (property, action) => {
  return async context => {
    if (get(context, property, 'not-found') === 'not-found') return context

    if (Array.isArray(action)) {
      for(let i =0; i < action.length; i++) {
        await action[i](context)
      }
    } else {
      await action(context)
    }

    return context
  }
}
