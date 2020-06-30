//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const projectServiceQueries = require('../services/project.service').ALL_QUERIES
const taskServiceQueries = require('../services/task.service').ALL_QUERIES
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


beforeAll(() => {
  dbConnection.Connect()
  dbConnection.SelectDB(config.db.database)
  return clearTable()
})

afterAll(() => {
  dbConnection.Close()
})

function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE projects')
}

function createTask (id) {
  return dbConnection.Query(taskServiceQueries.DB_CREATE_TASK,
    { text: 'random text for a task',
      user: projectUser,
      project: id })
    .then(tmpObj => {
      taskObjs.push(tmpObj)
    })
}

function getProjectById (id) {
  return dbConnection.Query(projectServiceQueries.DB_GET_PROJECT_BY_ID, [id])
}

let taskObjs = []
let projectObj = null
let projectUser = 45
let projectName = 'This is a test project created by a test'


describe('Projects', () => {

  test('Should not create a new project with a empty object', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .send({})
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing name field.")
      done()
    })
  })

  test('Should not create a new project with a invalid user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .send({
      user: -1,
      name: projectName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The user must be valid.")
      done()
    })
  })

  test('Should not create a new project with a invalid name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .send({
      user: projectUser,
      name: null })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing name field.")
      done()
    })
  })

  test('Should not create a new project with a small name property', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .send({
      user: projectUser,
      name: 'sam' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The name must be at least 4 characters long.")
      done()
    })
  })

  test('Should create a new project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .send({
      user: projectUser,
      name: projectName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(201)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.project).toBeDefined()
      expect(res.body.data.project.id).toBeDefined()
      expect(typeof res.body.data.project.id === 'number').toBe(true)
      expect(res.body.data.project.name).toBeDefined()
      expect(typeof res.body.data.project.name === 'string').toBe(true)
      expect(res.body.data.project.user).toBeDefined()
      expect(typeof res.body.data.project.user === 'number').toBe(true)
      expect(res.body.data.project.isDone).toBeDefined()
      expect(typeof res.body.data.project.isDone === 'boolean').toBe(true)
      expect(res.body.data.project.doneDate).toBeDefined()
      expect(res.body.data.project.created).toBeDefined()
      expect(res.body.data.project.updated).toBeDefined()
      expect(res.body.data.project.tasksTotal).toBeDefined()
      expect(typeof res.body.data.project.tasksTotal === 'number').toBe(true)
      expect(res.body.data.project.tasksDone).toBeDefined()
      expect(typeof res.body.data.project.tasksDone === 'number').toBe(true)
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_CREATED_PROJECT)
      projectObj = res.body.data.project
      createTask(projectObj.id)
      createTask(projectObj.id)
      createTask(projectObj.id)
      createTask(projectObj.id)
      done()
    })
  })

  test('Should return the correct project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(projectObj.id))
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message).toEqual(constants.messages.SUCCESS)
      expect(res.body.data.project.id).toBe(projectObj.id)
      expect(res.body.data.project.name).toBe(projectObj.name)
      expect(res.body.data.project.user).toBe(projectObj.user)
      expect(res.body.data.project.isDone).toBe(false)
      expect(res.body.data.project.tasksTotal).toBe(0)
      done()
    })
  })

  const updatedName = 'This should be the updated NAME here bla 1234'

  test('Should update project name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_PROJECT(projectObj.id))
    .send({ id: projectObj.id, name: updatedName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_PROJECT)
      expect(res.body.data.project.id).toBe(projectObj.id)
      expect(res.body.data.project.name).toBe(updatedName)
      expect(res.body.data.project.user).toBe(projectObj.user)
      expect(res.body.data.project.isDone).toBe(false)
      done()
    })
  })

  test('Should return an array of projects related to user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + projectUser)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_PROJECTS) !== -1)
      expect(res.body.data.projects.length).toBeGreaterThan(0)
      done()
    })
  })

  test('Should delete the project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .delete(constants.paths.API_PROJECT(projectObj.id))
    .send({ id: projectObj.id })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_DELETED_PROJECT)
      expect(res.body.data).toStrictEqual({})
      done()
    })
  })

  test('A project should not return after being deleted', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(projectObj.id))
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.PROJECT_NOT_FOUND)
      expect(res.body.data).toStrictEqual({})
      done()
    })
  })

  test('If no projects found relating to a user an empty array should return', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + projectUser)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_PROJECTS) !== -1)
      expect(res.body.data.projects.length).toBe(0)
      done()
    })
  })

  test('Creating a task should update a projects total tasks count', () => {}) // todo
  test('Updating a task should update a projects done tasks count', () => {}) // todo
  test('Updating all tasks should update a projects to be complete', () => {}) // todo
  test('Deleting a task should update a projects total tasks count', () => {}) // todo

})