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

/**
 * @typedef {object} Project
 *
 * @property {number}   [id]          Unique ID
 * @property {string}   name          Name of project
 * @property {number}   user          User Id
 * @property {number}   tasksTotal    Total tasks related
 * @property {number}   tasksDone     Total tasks related that are done
 * @property {boolean}  isDone        Task state
 * @property {date}     doneDate      Date Task was completed
 * @property {date}     [created]     Date Task was created
 * @property {date}     [updated]     Date Task was updated
 */
