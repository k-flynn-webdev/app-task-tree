import axios from 'axios'
import Http from './HttpService.js'

const USER_TOKEN = 'user_token'
const USER_PAYLOAD = 'user_payload'

function setUser (res) {
  if (res.data &&
    res.data.data &&
    res.data.data.account) {
    localStorage.setItem(USER_PAYLOAD,
      JSON.stringify(res.data.data.account))
    return res
  }

  localStorage.setItem(USER_PAYLOAD, '')
  return res
}

function getUser () {
  const local = localStorage.getItem(USER_PAYLOAD)
  if (local === undefined || local === 'undefined' || local === null) {
    return
  }

  return JSON.parse(local)
}

function onMount () {
  getToken()
}

onMount()

function applyToken (res) {
  if (res.data &&
    res.data.data &&
    res.data.data.token) {
    localStorage.setItem(USER_TOKEN, res.data.data.token)
    setAuth(res.data.data.token)
    return res
  }

  localStorage.setItem(USER_TOKEN, null)
  removeAuth()
  return res
}

function getToken () {
  const token = localStorage.getItem(USER_TOKEN)
  if (token) {
    setAuth(token)
    return
  }

  removeAuth()
}

function setAuth (auth) {
  axios.defaults.headers.common.authorization = `Bearer ${auth}`
}

function removeAuth () {
  axios.defaults.headers.common.authorization = null
}

function get () {
  return Http.get('/api/user')
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function create (input) {
  return Http.post('/api/user/create', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function login (input) {
  return Http.post('/api/user/login', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function logout () {
  return Http.post('/api/user/logout')
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function update (input) {
  return Http.patch('/api/user', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function resetStart (input) {
  return Http.post('/api/user/reset', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function resetComplete (input) {
  return Http.patch(`/api/user/reset/${input.verify}`, input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function verify (input) {
  return Http.get(`/api/user/verify/${input}`)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

const services = {
  create: create,
  login: login,
  logout: logout,
  update: update,
  verify: verify,
  get: get,
  getUser: getUser,
  resetStart: resetStart,
  resetComplete: resetComplete
}

export default services
