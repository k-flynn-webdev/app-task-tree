const { expect } = require('chai');
const nanoIdHook = require('../../src/hooks/create-nano-id');

describe('\'create nano id\' hook', () => {
  it('When a email is present in `context.data` nano-id updates the context.data{name}', () => {
    const hookTest = nanoIdHook('test');
    const testObj = { data: { email: 'testEmail', test: '' } };

    hookTest(testObj);


    expect(testObj.data.test).length.to.be.a('string');
    expect(testObj.data.test).length.to.be.greaterThan(5);
  });
  it('Without a email present in `context.data` nano-id does not edit context.data{name}', () => {
    const hookTest = nanoIdHook('test');
    const testObjNoEmail = { data: { test: '' } };

    hookTest(testObjNoEmail);

    expect(testObjNoEmail.data.test).length.to.be.lessThan(1);
  });
});
