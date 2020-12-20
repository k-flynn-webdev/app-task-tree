const assert = require('assert');
const app = require('../../src/app');
const API_PREFIX = '/api/'

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service(API_PREFIX + 'users');

    assert.ok(service, 'Registered the service');
  });
});
