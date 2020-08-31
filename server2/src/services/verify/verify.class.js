const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-knex');

exports.Verify = class Verify extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'users'
    });
  }

  get (verify, params) {

    if (!verify) return;
    if (!params.user) return;

    if (!params.user.verify) {
      throw new BadRequest('User already verified.');
    }

    const verifyMatches = (params.user.verify === verify);

    if (!verifyMatches) {
      throw new BadRequest('Invalid verify token.');
    }

    const data = {
      verify: null,
      updated_at: new Date()
    };

    return super.patch(params.user.id, data, params);
  }
};
