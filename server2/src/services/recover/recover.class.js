const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-knex');

exports.Recover = class Recover extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'users'
    });
  }

  async patch (recover, data, params) {

    if (!recover) return;
    const queryRecover = { query: { recover } };

    // get user via recover string
    const userFound = await super.find(queryRecover);
    params.user = userFound.data[0];

    if (!params.user) {
      throw new BadRequest('No User found with recover token.', {});
    }

    return super.patch(params.user.id, data, params);
  }
};
