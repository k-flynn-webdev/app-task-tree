const { expect } = require('chai');
const limitToRole = require('../../src/hooks/limit-to-role');


describe('\'limit to role\' hook', () => {
  it('Should not throw an error when the `context.params.user.role` matches', () => {
    const hookTest = limitToRole('testRole');
    const testCtx = { params: { user: { role: 'testRole' } }};

    const test = hookTest(testCtx);

    expect(test.errors).to.be.undefined;
  });
  it('Should throw an error when the `context.params.user.role` mis-matches', () => {
    const hookTest = limitToRole('testRole');
    const testCtx = { params: { user: { role: 'anotherRole' } }};

    const test = hookTest(testCtx);

    expect(test.code).to.equal(400);
    expect(test.type).to.equal('FeathersError');
  });
});
