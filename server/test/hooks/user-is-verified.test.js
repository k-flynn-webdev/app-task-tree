const { expect } = require('chai');
const userIsVerified = require('../../src/hooks/user-is-verified');


describe('\'user if verified\' hook', () => {
  it('Should not throw an error if the `ctx.params.user` is verified', () => {
    const userObj = { params: { user: { verify: null } } };
    const hookTest = userIsVerified(userObj);

    expect(hookTest.params.user.verify).to.be.null;
  });
  it('Should throw an error if the `ctx.params.user` does not exist', () => {
    const noneUser = { params: {  } };

    expect(() => userIsVerified(noneUser)).throws(Error, 'User has not been found.');
  });
  it('Should throw an error if the `ctx.params.user` is NOT verified', () => {
    const userObj = { params: { user: { verify: 'LongTokenHere' } } };

    expect(() => userIsVerified(userObj)).throws(Error, 'User must be verified in order to update details.');
  });
});
