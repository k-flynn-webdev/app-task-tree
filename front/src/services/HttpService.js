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
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  store.commit('status', status.SUCCESS)
  return res
}, error => {
  if (error.response.data.status === 401) {
    store.commit('status', status.ERROR)
    if (store.getters['user/user'].role === status.ANON) {
      return store.dispatch('user/getAnonToken')
        .then(() => router.push({ name: Paths.HOME }))
    }
    store.dispatch('user/logout')
    router.push({ name: Paths.USER_LOGIN })
  }
  return Promise.reject(error)
})

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
