// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// validation
const joi = require('@hapi/joi');
const get = require('lodash').get;

const checkEmail = joi.string().min(4).email({ minDomainSegments: 2 }).required();
const checkPassword = joi.string().min(6).max(100).required();


const validateItems = (testItems, context) => {
  for (let i = 0; i < testItems.length; i ++) {
    const testFunc = testItems[i][0];
    const testParam = testItems[i][1];
    const testRequire = testItems[i][2];

    const source = context.data[testParam] ? context.data[testParam].trim() : '';

    const test = testFunc.validate(source);

    if (testRequire && test.error) {
      throw new Error(get(test, 'error.details[0].message', 'error'));
    }
  }
};


const create = () => {
  return async context => {
    const checkVars = [
      [checkEmail, 'email', true],
      [checkPassword, 'password', true]
    ];

    validateItems(checkVars, context);

    return context;
  };
};

exports.create = create;

const patch = () => {
  return async context => {

    const checkVars = [
      [checkEmail, 'email', false],
      [checkPassword, 'password', false]
    ];

    validateItems(checkVars, context);

    return context;
  };
};

exports.patch = patch;
