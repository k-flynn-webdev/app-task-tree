const { Service } = require('feathers-knex');

exports.Project = class Project extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'project'
    });
  }
};
