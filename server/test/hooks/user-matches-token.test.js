const { expect } = require('chai');
const userMatchesTokenTest = require('../../src/hooks/user-matches-token');


describe('\'user matches token\' hook', () => {
  it('Should not throw an error when User and Id match', () => {
    const ctxObj = { id: '115', params: { user: { id: 115, role: 'user' } } };
    const hookTest = userMatchesTokenTest(ctxObj);

    expect(hookTest.error).to.be.undefined;
    expect(hookTest).to.deep.equal(ctxObj);
  });
  it('Should throw an error when User does not match the Id', () => {
    const ctxObj = { id: '115', params: { user: { id: 120, role: 'user' } } };
    const hookTest = userMatchesTokenTest(ctxObj);

    expect(hookTest.name).to.equal('BadRequest');
    expect(hookTest.type).to.equal('FeathersError');
    expect(hookTest.message).to.equal('User and Token do not match.');
  });
  it('Should not throw an error when a Admin does not match the Id', () => {
    const ctxObj = { id: '115', params: { user: { id: 120, role: 'admin' } } };
    const hookTest = userMatchesTokenTest(ctxObj);

    expect(hookTest.error).to.be.undefined;
    expect(hookTest).to.deep.equal(ctxObj);
  });
});
