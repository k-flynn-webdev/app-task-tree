const { Service } = require('feathers-knex');

exports.Task = class Task extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'task'
    });
  }
};
