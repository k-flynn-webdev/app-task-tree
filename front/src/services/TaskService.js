import Http from './HttpService.js'

function all (params) {
  return Http.get('/api/tasks', { params })
}

function get (task) {
  return Http.get(`/api/task/${task.id}`)
}

function create (task) {
  return Http.post('/api/task/create', task)
}

function update (task) {
  return Http.patch(`/api/task/${task.id}`, task)
}

function replace (task) {
  return Http.put(`/api/task/${task.id}`, task)
}

function remove (task) {
  return Http.remove(`/api/task/${task.id}`, task)
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  replace: replace,
  remove: remove
}

export default services
