const assert = require('assert');
const nanoIdHook = require('../../src/hooks/create-nano-id');

describe('\'create nano id\' hook', () => {
  it('When a email is present in `context.data` nano-id updates the context.data{name}', () => {
    const hookTest = nanoIdHook('test');
    const testObj = { data: { email: 'testEmail', test: '' } };

    hookTest(testObj);

    assert.ok(testObj.data.test.length > 5, 'Hook updated context data');
  });
  it('Without a email present in `context.data` nano-id does not edit context.data{name}', () => {
    const hookTest = nanoIdHook('test');
    const testObjNoEmail = { data: { test: '' } };

    hookTest(testObjNoEmail);

    assert.ok(testObjNoEmail.data.test.length < 1, 'Hook did not update context data');
  });
});
