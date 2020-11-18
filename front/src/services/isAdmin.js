import HttpService from './HttpService'
import Store from '../store/user'

import { USER } from '@/constants'

/**
 * API request to check if token user is Admin
 *
 * @return {Promise}
 */
const isAdminAPI = () => {
  try {
    return Store.actions(`${USER.store}/get`)
      .then(user => user.role.toLowerCase() === 'admin')
  } catch (err) {
    return HttpService.get(USER.API.GET)
      .then(({ data }) => {
        return data.user.role.toLowerCase() === 'admin'
    })
  }


}

export default isAdminAPI
