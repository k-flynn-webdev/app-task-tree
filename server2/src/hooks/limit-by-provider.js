// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
// const joi = require('@hapi/joi');
// const get = require('lodash').get;
const { MethodNotAllowed } = require('@feathersjs/errors');

/**
 * Limit access to resources by provider
 *
 * @params {string}   providerType    provider to allow  choices:- [ server, external ]
 * @return {function(*)}
 */
const limitToProvider = (providerType) => {
  return context => {

    if (context.params.provider &&
      context.params.provider !== providerType) {
      console.log('throwing error in limit by')
      throw new MethodNotAllowed()
    }

    return context
  }
}

module.exports = limitToProvider
