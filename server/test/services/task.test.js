const assert = require('assert');
const app = require('../../src/app');
const API_PREFIX = '/api/'

describe('\'task\' service', () => {
  it('registered the service', () => {
    const service = app.service(API_PREFIX + 'tasks');

    assert.ok(service, 'Registered the service');
  });
});
