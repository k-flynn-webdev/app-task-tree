const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

/**
 * Extend the standard AuthenticationService package to include
 *      additional data from the User object.
 */
class ExtendAuthPayload extends AuthenticationService {
  async getPayload(authResult, params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    if (user) {
      if (user.id) payload.id = user.id;
      if (user.role) payload.role = user.role;
      if (user.created_at) payload.created_at = user.created_at;
    }

    return payload;
  }
}

module.exports = app => {
  const authentication = new ExtendAuthPayload(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
