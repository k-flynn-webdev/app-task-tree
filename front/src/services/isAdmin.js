import HttpService from './HttpService'
import Store from '../store/user'

import { USER, ADMIN } from '@/constants'

/**
 * API request to check if token user is Admin
 *    Will check the store then the API if failing
 *
 * @param {function}  success   function to execute on success
 * @param {function}  fail      function to execute on failure
 * @return {Promise}
 */
const isAdminAPI = (success, fail) => {
  try {
    return Store.actions(`${USER.store}/get`)
      .then(user => {
        if (user.role.toLowerCase() === ADMIN.value) {
          return success()
        }

        return fail()
      })
  } catch (err) {
    return HttpService.get(USER.API.GET)
      .then(({ data }) => {
        if (data.user.role.toLowerCase() === ADMIN.value) {
          return success()
        }

        return fail ()
      })
      .catch(err => fail (err))
  }
}

export default isAdminAPI
