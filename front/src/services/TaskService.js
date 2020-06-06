import Http from './HttpService.js'

function all (params) {
  return Http.get('/api/tasks', { params })
}

function get (taskID) {
  return Http.get(`/api/task/${taskID}`)
}

function create (task) {
  return Http.post('/api/task/create/', task)
}

function update (task) {
  return Http.patch('/api/task/', task)
}

function remove (task) {
  return Http.remove('/api/task/', task)
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  remove: remove
}

export default services
