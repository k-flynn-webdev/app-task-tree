const limitByRole = require('../../src/hooks/limit-by-role');
const { expect } = require('chai');


describe.only('\'limit by role\' hook', () => {
  it('Should not throw an error when the `context.params.user.role` matches', () => {
    const hookTest = limitByRole('testRole');
    const testCtx = { params: { user: { role: 'testRole' } }};

    const test = hookTest(testCtx);

    expect(test.errors).to.be.undefined;
  });
  it('Should throw an error when the `context.params.user.role` mis-matches', () => {
    const hookTest = limitByRole('testRole');
    const testCtx = { params: { user: { role: 'anotherRole' } }};

    const test = hookTest(testCtx);

    expect(test.code).to.equal(400);
    expect(test.type).to.equal('FeathersError');
  });
});
