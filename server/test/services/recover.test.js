const assert = require('assert');
const app = require('../../src/app');

describe('\'recover\' service', () => {
  it('registered the service', () => {
    const service = app.service('recover');

    assert.ok(service, 'Registered the service');
  });
});
