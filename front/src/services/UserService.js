import axios from 'axios'
import Http from './HttpService.js'

const USER_TOKEN = 'user_token'
const USER_PAYLOAD = 'user_payload'

function setUser (res) {
  if (res.data &&
    res.data.data &&
    res.data.data.account &&
    res.data.data.account.id) {
    localStorage.setItem(USER_PAYLOAD,
      JSON.stringify(res.data.data.account))
    return res
  }

  localStorage.removeItem(USER_PAYLOAD)
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

  localStorage.removeItem(USER_TOKEN)
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

/**
 * Returns user account details
 */
function get () {
  return Http.get('/api/user')
    .then(res => setUser(res))
}

/**
 * Returns Anon user token
 */
function getAnonApiToken (input) {
  return Http.get(`/api/user/anon/${input.id}`,
    { params: { created: input.created } })
    .then(res => applyToken(res))
}

function create (input) {
  return Http.post('/api/user', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function createAnon () {
  return Http.post('/api/user/anon')
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function createUpgrade (input) {
  return Http.patch('/api/user/upgrade', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function login (input) {
  return Http.post('/api/user/login', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function logout () {
  return Http.get('/api/user/logout')
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function update (input) {
  return Http.patch('/api/user', input)
    .then(res => applyToken(res))
    .then(res => setUser(res))
}

function resetStart (input) {
  return Http.get(`/api/user/reset/${input.email}`)
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
  create,
  createAnon,
  createUpgrade,
  login,
  logout,
  update,
  verify,
  get,
  getAnonApiToken,
  getUser,
  resetStart,
  resetComplete
}

export default services
