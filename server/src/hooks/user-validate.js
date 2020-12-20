// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const joi = require('@hapi/joi');
const { BadRequest } = require('@feathersjs/errors')
const validateLoop = require('../helpers/validate-loop')

const checkEmail = joi.string().label('email').min(4).email({ minDomainSegments: 2 }).required();
const checkPassword = joi.string().label('password').min(6).max(100).required();


const create = (context) => {
  const checkVars = [
    [checkEmail, 'email', true],
    [checkPassword, 'password', true]
  ]

  if (Object.keys(context.data).length < 1) throw new BadRequest('Missing params.', {})

  context.data = {
    email: context.data.email,
    password: context.data.password
  }

  validateLoop(checkVars, context);

  return context;
};

exports.create = create;
exports.update = create;

const recover = (context) => {
  const checkVars = [
    [checkPassword, 'password', true]
  ];

  if (Object.keys(context.data).length < 1) throw new BadRequest('Missing params.', {})

  context.data = {
    password: context.data.password
  }

  validateLoop(checkVars, context);

  return context;
};

exports.recover = recover;

const patch = (context) => {
  const checkVars = [
    [checkEmail, 'email', false],
    [checkPassword, 'password', false]
  ];

  validateLoop(checkVars, context);

  return context;
};

exports.patch = patch;
