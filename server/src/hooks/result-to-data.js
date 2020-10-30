// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 *  Add a data [propName] object to the payload
 *
 * @param {string} propName   Name of object data to be sent
 * @return {function(*): *}
 */
module.exports = (propName= 'data') => {
  return context => {
    const dataObj = JSON.parse(JSON.stringify(context.result))
    context.result = {}
    context.dispatch = {}
    context.dispatch[propName] = dataObj

    return context
  }
}
