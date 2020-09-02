const nanoid = require('nanoid').nanoid;

/**
 * Adds a nano-id string to a field
 *    `IF` an email is present in the data payload
 *
 * @param name      name of field to add the nano-id string usually:[verify | recover]
 * @return {function(*)}
 */
module.exports = (name) => {
  return context => {
    if (context.data && context.data.email) {
      context.data[name] = nanoid();
    }

    return context;
  };
};
