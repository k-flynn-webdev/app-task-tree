// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 *  Add a data [propName] object to the payload
 *
 * @param {string}  propName      Name of object data to be sent
 * @param {boolean} clearResult   Clear previous result obj
 * @return {function(*): *}
 */
module.exports = (propName= 'data', clearResult = false) => {
  return context => {
    const dataObj = JSON.parse(JSON.stringify(context.result))
    if (clearResult) context.result = {}
    context.dispatch = {}
    context.dispatch[propName] = dataObj

    return context
  }
}
