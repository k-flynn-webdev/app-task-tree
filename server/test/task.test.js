//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const projectsServiceQueries = require('../services/project.service').ALL_QUERIES
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


beforeAll(() => {
  dbConnection.Connect()
  dbConnection.SelectDB(config.db.database)
  createProject()
})

afterAll(() => {
  dbConnection.Close()
  // todo clear database
})


function createProject () {
  return dbConnection.Query(projectsServiceQueries.DB_CREATE_PROJECT,
    { name: 'testProject', user: taskUser})
  .then(result => {
    projectObj = result
    taskProject = result.insertId
  })
}

let projectObj = null
let taskObj = null
let taskUser = 33
let taskProject = -1
let taskText = 'This is a test task created by a test'


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

  it('Should not create a new task with a invalid user', (done) => {
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

  it('Should not create a new task with a invalid project', (done) => {
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

  it('Should not create a new task with a small text property', (done) => {
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

  it('Should create a new task', (done) => {
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

})

