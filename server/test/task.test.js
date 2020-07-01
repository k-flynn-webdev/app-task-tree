//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const projectServiceQueries = require('../services/project.service').ALL_QUERIES
const taskServiceQueries = require('../services/task.service').ALL_QUERIES
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


let projectObj = null
let taskObj = null
let taskUser = 222
let taskProject = -1
let taskText = 'This is a test task created by a task.test'

function createProject () {
  return dbConnection.Query(projectServiceQueries.DB_CREATE_PROJECT,
    { name: 'testProject', user: taskUser})
  .then(result => {
    projectObj = result
    taskProject = result.insertId
  })
}

function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE tasks')
}

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
  .then(() => clearTable())
  .then(() => createProject())
})

afterAll(() => {
  dbConnection.Close()
})

describe('Tasks', () => {

  test('Should not create a new task with a empty object', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({})
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing text field.")
      done()
    })
  })

  test('Should not create a new task with a invalid user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({
      user: -1,
      project: taskProject,
      text: taskText })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The user must be valid.")
      done()
    })
  })

  test('Should not create a new task with a invalid project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({
      user: taskUser,
      project: -1,
      text: taskText })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The project must be valid.")
      done()
    })
  })

  test('Should not create a new task with a small text property', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({
      user: taskUser,
      project: taskProject,
      text: 'sma' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(422)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The task text must be at least 4 characters long.")
      done()
    })
  })

  test('Should create a new task with valid properties', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({
      user: taskUser,
      project: taskProject,
      text: taskText })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(201)
      expect(res.body).toBeDefined()
      expect(res.body.data).toBeDefined()
      expect(res.body.data.task).toBeDefined()
      expect(res.body.data.task.id).toBeDefined()
      expect(typeof res.body.data.task.id === 'number').toBe(true)
      expect(res.body.data.task.text).toBeDefined()
      expect(typeof res.body.data.task.text === 'string').toBe(true)
      expect(res.body.data.task.user).toBeDefined()
      expect(typeof res.body.data.task.user === 'number').toBe(true)
      expect(res.body.data.task.project).toBeDefined()
      expect(typeof res.body.data.task.project === 'number').toBe(true)
      expect(res.body.data.task.isDone).toBeDefined()
      expect(typeof res.body.data.task.isDone === 'boolean').toBe(true)
      expect(res.body.data.task.doneDate).toBeDefined()
      expect(res.body.data.task.created).toBeDefined()
      expect(res.body.data.task.updated).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual(constants.messages.SUCCESS_CREATED_TASK)
      taskObj = res.body.data.task
      done()
    })
  })

  test('Should return the correct task', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASK(taskObj.id))
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message).toEqual(constants.messages.SUCCESS)
      expect(res.body.data.task.id).toBe(taskObj.id)
      expect(res.body.data.task.text).toBe(taskObj.text)
      expect(res.body.data.task.project).toBe(taskObj.project)
      expect(res.body.data.task.user).toBe(taskObj.user)
      expect(res.body.data.task.isDone).toBe(false)
      done()
    })
  })

  const updatedText = 'This should be the updated text here bla 1234'

  test('Should update task text', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_TASK(taskObj.id))
    .send({ id: taskObj.id, text: updatedText })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_TASK)
      expect(res.body.data.task.id).toBe(taskObj.id)
      expect(res.body.data.task.text).toBe(updatedText)
      expect(res.body.data.task.project).toBe(taskObj.project)
      expect(res.body.data.task.user).toBe(taskObj.user)
      expect(res.body.data.task.isDone).toBe(false)
      done()
    })
  })

  test('Should complete a task', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_TASK(taskObj.id))
    .send({ id: taskObj.id, isDone: true })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_TASK)
      expect(res.body.data.task.id).toBe(taskObj.id)
      expect(res.body.data.task.isDone).toBe(true)
      expect(res.body.data.task.doneDate !== null).toBe(true)
      done()
    })
  })

  test('Should un-complete the same task', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_TASK(taskObj.id))
    .send({ id: taskObj.id, isDone: false })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_UPDATED_TASK)
      expect(res.body.data.task.id).toBe(taskObj.id)
      expect(res.body.data.task.isDone).toBe(false)
      expect(res.body.data.task.doneDate).toBeNull()
      done()
    })
  })

  test('Should return an array of tasks related to user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASKS + '?user=' + taskUser)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_TASKS) !== -1)
      expect(res.body.data.tasks.length).toBeGreaterThan(0)
      done()
    })
  })

  test('Should return an array of tasks related to project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASKS + '?project=' + taskProject)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_TASKS) !== -1)
      expect(res.body.data.tasks.length).toBeGreaterThan(0)
      done()
    })
  })

  test('Should delete the task', (done) => {
    chai.request(config.ip + ':' + config.port)
    .delete(constants.paths.API_TASK(taskObj.id))
    .send({ id: taskObj.id })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_DELETED_TASK)
      expect(res.body.data).toBeNull()
      done()
    })
  })

  test('A task should not return after being deleted', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASK(taskObj.id))
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.TASK_NOT_FOUND)
      expect(res.body.data).toBeNull()
      done()
    })
  })

  test('If no tasks found relating to a project an empty array should return', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASKS + '?project=' + taskProject)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_TASKS) !== -1)
      expect(res.body.data.tasks.length).toBe(0)
      done()
    })
  })

  test('If no tasks found relating to a user an empty array should return', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_TASKS + '?user=' + taskUser)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_TASKS) !== -1)
      expect(res.body.data.tasks.length).toBe(0)
      done()
    })
  })

})

