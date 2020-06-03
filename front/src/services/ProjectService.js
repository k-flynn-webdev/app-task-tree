import Http from './HttpService'

function all (params) {
  return Http.get('/api/project/all', params)
}

function get (projectID) {
  return Http.get(`/api/project/${projectID}`)
}

function create (project) {
  return Http.post('/api/project/create/', project)
}

function update (project) {
  return Http.patch(`/api/project/${project.id}`, project)
}

function remove (projectID) {
  return Http.remove(`/api/project/${projectID}`)
}

const services = {
  all: all,
  get: get,
  create: create,
  update: update,
  remove: remove
}

export default services
