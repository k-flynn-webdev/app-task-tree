// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
const joi = require('@hapi/joi');
const get = require('lodash').get;

const validateEmail = joi.string().min(4).email({ minDomainSegments: 2 }).required();
const validatePassword = joi.string().trim().min(6).max(100).required();

const create = () => {
  return async context => {

    const emailResult = validateEmail.validate(context.data.email.trim());
    if (emailResult.error) {
      throw new Error(get(emailResult, 'error.details[0].message', 'error'));
    }

    const passResult = validatePassword(context.data.password.trim());
    if (passResult.error) {
      console.log(passResult);
      throw new Error(passResult.error.detils);
    }

    return context;
  };
};

exports.create = create;

const patch = () => {
  return async context => {

    if (context.data.email) {
      const emailResult = validateEmail.validate(context.data.email.trim());
      if (emailResult.error) {
        throw new Error(emailResult.error.details);
      }
    }

    if (context.data.password) {
      const passResult = validatePassword(context.data.password.trim());
      if (passResult.error) {
        throw new Error(passResult.error.detils);
      }
    }

    return context;
  };
};

exports.patch = patch;
