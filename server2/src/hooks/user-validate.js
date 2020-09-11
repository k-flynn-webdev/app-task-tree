// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi');
const get = require('lodash').get;
const { BadRequest } = require('@feathersjs/errors');

const checkEmail = joi.string().label('email').min(4).email({ minDomainSegments: 2 }).required();
const checkPassword = joi.string().label('password').min(6).max(100).required();


const validateItems = (testItems, context) => {
  if (!context.data) throw new BadRequest('Missing params.', {})
  if (Object.keys(context.data).length < 1) throw new BadRequest('Missing params.', {});

  for (let i = 0; i < testItems.length; i ++) {
    const testFunc = testItems[i][0];
    const testParam = testItems[i][1];
    const testRequire = testItems[i][2];

    const source = context.data[testParam] ? context.data[testParam].trim() : '';

    const test = testFunc.validate(source);

    if (testRequire && test.error) {
      throw new BadRequest(get(test, 'error.details[0].message',
        'An error occurred on validation.'), {});
    }
  }
};


const create = (context) => {
  const checkVars = [
    [checkEmail, 'email', true],
    [checkPassword, 'password', true]
  ]

  context.data = {
    email: context.data.email,
    password: context.data.password
  }

  validateItems(checkVars, context);

  return context;
};

exports.create = create;

const recover = (context) => {
  const checkVars = [
    [checkPassword, 'password', true]
  ];

  context.data = {
    password: context.data.password
  }

  validateItems(checkVars, context);

  return context;
};

exports.recover = recover;

const patch = (context) => {
  const checkVars = [
    [checkEmail, 'email', false],
    [checkPassword, 'password', false]
  ];

  validateItems(checkVars, context);

  return context;
};

exports.patch = patch;
