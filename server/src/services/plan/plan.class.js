const { Service } = require('feathers-knex');

exports.Plan = class Plan extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'plan'
    });
  }
};
