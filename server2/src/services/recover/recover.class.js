const { BadRequest } = require('@feathersjs/errors')
const { Service } = require('feathers-knex')
const createNanoId = require('../../hooks/create-nano-id')
const timeStamp = require('../../hooks/time-stamp')

exports.Recover = class Recover extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'users'
    })
  }

  /**
   * Limit all queries to only the email address
   *
   * @param params
   * @return {Promise<T[]>}
   */
  find (params) {

    if (!params.query) throw new BadRequest('Missing a query', {})
    if (!params.query['email']) throw new BadRequest('Missing email query', {})

    params.query = { email: params.query['email'] }

    return super.find(params)
      .then(res => {
        params.data = {}
        timeStamp('updated_at')(params)
        createNanoId('recover', true)(params)
        return super.patch(res.data[0].id, params.data, params)
      })
  }

  async patch (recover, data, params) {

    if (!recover) return
    const queryRecover = { query: { recover } }

    // get user via recover string
    const userFound = await super.find(queryRecover)
    params.user = userFound.data[0]

    if (!params.user) {
      throw new BadRequest('No User found with recover token.', {})
    }

    return super.patch(params.user.id, data, params)
  }
};
