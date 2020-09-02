// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Updates a property field with a new Date()
 *
 * @param {string}      name    field to set asa date obj
 * @return {function(*): *}
 */
module.exports = (name) => {
  return context => {

    context.data[name] = new Date();

    return context;
  };
};
