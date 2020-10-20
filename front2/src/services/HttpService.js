import router from '../router'
import store from '../store'
import axios from 'axios'
const qs = require('qs')

// import Paths from '../constants/paths.js'
// import status from '../constants/status'

const USER_TOKEN = 'accessToken'

axios.defaults.headers.common['Accept-Version'] = 'v1'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.paramsSerializer = function(params) {
  return qs.stringify(params,
  { encode: false })
};

;(function init () {
  const token = localStorage.getItem(USER_TOKEN)
  if (!token) {
    authRemove()
    return
  }
  authSet(token)
})()

function authSet (auth) {
  axios.defaults.headers.common.authorization = `Bearer ${auth}`
  localStorage.setItem(USER_TOKEN, auth)
  store.commit('user/isLoggedIn', true)
}

function authRemove () {
  axios.defaults.headers.common.authorization = null
  localStorage.removeItem(USER_TOKEN)
  store.commit('user/isLoggedIn', false)
}

// axios.interceptors.request.use((config) => {
// store.commit('setStatus', status.WAITING)
// return config
// }, (err) => Promise.reject(err))

axios.interceptors.response.use(httpSuccess, httpError)

function httpSuccess (res) {
  if (res.data && res.data.accessToken) {
    authSet(res.data.accessToken)
  }

  return res
}

function httpError (err) {
  if (err.response.status === 401 &&
    err.response.statusText === 'Unauthorized') {
    authRemove()

    setTimeout(function() {
      router.push({ name: 'login' })
    }, 0.5 * 1000)

  //   const isAnon = store.getters['user/isAnon']
  //   const signOut = isAnon
  //     ? store.dispatch('user/getAnonToken')
  //     : store.dispatch('user/logout')
  //
  //   return signOut
  //     .then(() => {
  //       if (!isAnon) router.push({ name: Paths.USER_LOGIN })
  //       throw error
  //     })
  }

  throw err
  // store.commit('setStatus', status.ERROR)
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
    // .catch(() => { /** silent **/ })
    // .finally(() => authRemove())
}

const services = {
  get,
  post,
  put,
  patch,
  remove,
  authSet,
  authRemove
}
export default services
