import Http from './HttpService'

function all (params) {
  return Http.get('/api/projects', { params })
}

function get (project) {
  return Http.get(`/api/project/${project.id}`)
}

function create (project) {
  return Http.post('/api/project/create', project)
}

function update (project) {
  return Http.patch(`/api/project/${project.id}`, project)
}

function remove (project) {
  return Http.remove(`/api/project/${project.id}`)
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  remove: remove
}

export default services
