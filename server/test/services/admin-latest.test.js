const assert = require('assert');
const app = require('../../src/app');

describe('\'admin-latest\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin-latest');

    assert.ok(service, 'Registered the service');
  });
});
