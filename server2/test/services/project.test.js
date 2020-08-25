const assert = require('assert');
const app = require('../../src/app');

describe('\'project\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects');

    assert.ok(service, 'Registered the service');
  });
});
