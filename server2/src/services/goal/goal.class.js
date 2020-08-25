const { Service } = require('feathers-knex');

exports.Goal = class Goal extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'goal'
    });
  }
};
