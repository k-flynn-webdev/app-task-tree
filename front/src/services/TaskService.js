import Http from './HttpService.js'

function all (params) {
  return Http.get('/api/task/all', params)
}

function get (taskID) {
  return Http.get(`/api/task/${taskID}`)
}

function create (task) {
  return Http.post('/api/task/create/', task)
}

function update (task) {
  return Http.patch(`/api/task/${task.id}`, task)
}

function remove (taskID) {
  return Http.remove(`/api/task/${taskID}`)
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  remove: remove
}

export default services
