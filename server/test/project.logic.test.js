//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const projectServiceQueries = require('../services/project.service').ALL_QUERIES
const taskServiceQueries = require('../services/task.service').ALL_QUERIES
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const request = require('request')
const chai = require('chai')
chai.use(chaiHttp)

let taskObjs = []
let projectObj = null
let projectUser = 333
let projectName = 'This is a test project created by a test project.logic'


/**
 * Used to mock express app
 *
 * @constructor
 */
function appFake () {
  this.on = () => {}
  this.emit = () => {}

  return this
}
const mockApp = appFake()

const deleteTasksOnProjectDelete =
  require('../subscribers/delete.tasks.on.project.delete')(mockApp)


function clearTable () {
  return dbConnection.Query('TRUNCATE TABLE projects')
}

function createProject () {
  return dbConnection.Query(projectServiceQueries.DB_CREATE_PROJECT,
    { name: projectName,
      user: projectUser })
  .then(({ insertId }) => getProjectById(insertId))
  .then(([tmp]) => {
    projectObj = tmp
    return tmp
  })
}

function createTask (id) {
  return new Promise((resolve, reject) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_TASK_CREATE)
    .send({
      user: projectUser,
      project: id,
      text: 'random text for a task' })
    .then(tmpObj => {
      taskObjs.push(tmpObj.body.data.task)
      return resolve(tmpObj.body.data.task)
    })
  })
}

function createAllTasks(id) {
  return createTask(id)
  .then(() => createTask(id))
  .then(() => createTask(id))
  .then(() => createTask(id))
  .then(() => createTask(id))
  .then(() => id)
}

function getProjectById (id) {
  return dbConnection.Query(projectServiceQueries.DB_GET_PROJECT_BY_ID, [id])
}

beforeAll( () => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
  .then(() => clearTable())
})

afterAll(() => {
  dbConnection.Close()
})


describe('Projects logic', () => {
  beforeEach(() => {})
  afterEach(() => {})

  test('Creating many tasks should update a projects total tasks count', () => {
    return createProject()
    .then(() => createAllTasks(projectObj.id))
    .then(() => getProjectById(projectObj.id))
    .then(([tmpObj]) => {
      expect(tmpObj.tasksTotal).toBeGreaterThan(2)
      expect(tmpObj.tasksDone).toBe(0)
    })

  }) // todo
//
//     // test('Updating a task should update a projects done tasks count', () => {}) // todo
//     // test('Updating all tasks should update a projects to be complete', () => {}) // todo
//     // test('Deleting a task should update a projects total tasks count', () => {}) // todo
//     // test('Deleting a project with tasks should remove all related tasks', () => {}) // todo
//     //
//     // })
//
//   // })
})
