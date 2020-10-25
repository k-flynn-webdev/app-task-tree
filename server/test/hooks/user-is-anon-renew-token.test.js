const { expect } = require('chai');
const userIsAnonRenewToken = require('../../src/hooks/user-is-anon-renew-token');

const createAppCtx = (userType) => {
  const testTokenResult = 'superLongStringHere123hsfsdf';
  return {
    error: { data: { name: 'TokenExpiredError', expiredAt: new Date() } },
    params: {
      authentication: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpZCI6MTAsInJvbG' +
          'UiOiJhbm9uIiwiY3JlYXRlZF9hdCI6IjIwMjAtMDgtMjlUMjA6NTc6MTYuMDAwWiIsImlhd' +
          'CI6MTU5ODkwNjM3NywiZXhwIjoxNTk4OTA2OTc3LCJhdWQiOiJodHRwOi8vMTI3LjAuMDE6ODY' +
          'wMCIsImlzcyI6Ik1pbmlUYXNrIiwic3ViIjoiMTAiLCJqdGkiOiI1Yjc1YjRlOC03YjZiLTQ1M2' +
          'QtOWViOS0yMDk5OWM3MTQ1ZDAifQ.7_lHED7cKJqYTZ25mi66QST5E3splJ1ruSUx-5uJ0Rc'
      }
    },
    app: {
      service: () => { return { createAccessToken: () => testTokenResult }; },
      services: { users: { get: () => { return { id: 12, role: userType, created_at: new Date() }; } } }
    }
  };
};

describe('\'user is anon renew token\' hook', () => {
  it('Should error and not return a token for an expired users token', () => {
    userIsAnonRenewToken(createAppCtx('user'))
      .catch(err => {
        expect(err).to.be.a('error');
        expect(err.result).to.be.undfined;
      });
  });
  it('Should error `AND` return a token for an expired anon token', () => {
    userIsAnonRenewToken(createAppCtx('anon'))
      .catch(err => {
        expect(err).to.be.a('error');
        expect(err.result.tokenIsExpired).to.equal(true);
        expect(err.result.token).to.equal('superLongStringHere123hsfsdf');
      });
  });
});
