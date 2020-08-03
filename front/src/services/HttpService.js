import router from '../router'
import store from '../store'
import axios from 'axios'
import Paths from '../constants/paths.js'
import status from '../constants/status'

axios.defaults.headers.common['Accept-Version'] = 'v1'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.request.use((config) => {
  store.commit('status', status.WAITING)
  return config
}, (err) => Promise.reject(err))

axios.interceptors.response.use(httpSuccess, httpError)

function httpSuccess (res) {
  store.commit('status', status.SUCCESS)
  return res
}

function httpError (error) {
  if (error.response.data.status === 401) {
    const isAnon = (store.getters['user/isAnon'])
    const signOut = isAnon
      ? store.dispatch('user/getAnonToken')
      : store.dispatch('user/logout')

    return signOut
      .then(() => {
        if (!isAnon) router.push({ name: Paths.USER_LOGIN })
        throw error
      })
  }
  store.commit('status', status.ERROR)
  throw error
}

function get (url, params) {
  return axios.get(url, params)
}

function post (url, params) {
  return axios.post(url, params)
}

function put (url, params) {
  return axios.put(url, params)
}

function patch (url, params) {
  return axios.patch(url, params)
}

function remove (url, params) {
  return axios.delete(url, params)
}

const services = {
  get: get,
  post: post,
  put: put,
  patch: patch,
  remove: remove
}
export default services
