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
  .then(tmp => tmp)
}

const createAllTasks = (id, amount) => {
  let tmpArray = []
  for (let i = 0; i < amount; i++) { tmpArray.push(0) }
  const promises = tmpArray.map(item => createTask(id))
  return Promise.all(promises)
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
      return tmpObj.body.data.task
    })
    .then(item => resolve(item))
  })
}

const updateAllTasks = (items, value) => {
  const promises = items.map(item => updateTask(item.id, value))
  return Promise.all(promises)
}

function updateTask (id, isDone) {
  return new Promise((resolve, reject) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_TASK(id))
    .send({
      id: id,
      isDone: isDone })
    .then(tmpObj => {
      return tmpObj.body.data.task
    })
    .then(item => resolve(item))
  })
}

function deleteTask (id) {
  return new Promise((resolve, reject) => {
    chai.request(config.ip + ':' + config.port)
    .delete(constants.paths.API_TASK(id))
    .send({
      id: id
    })
    .then(tmpObj => {
      return tmpObj.body.data
    })
    .then(item => resolve(item))
  })
}

function getProjectById (id) {
  return new Promise((resolve, reject) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(id))
    .then(tmpObj => {
      return tmpObj.body.data.project
    })
    .then(item => resolve(item))
  })
}

function deleteProjectById (id) {
  return new Promise((resolve, reject) => {
    chai.request(config.ip + ':' + config.port)
    .delete(constants.paths.API_PROJECT(id))
    .then(tmpObj => {
      return tmpObj.body
    })
    .then(item => resolve(item))
  })
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

  test('Creating many tasks should update a projects total tasks count', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 6))
    .then(tasks => taskItems = tasks)
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(6)
      expect(tmpObj.tasksDone).toBe(0)
      done()
    })
  })

  test('Completing many tasks should update a projects total tasks done', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 6))
    .then(tasks => taskItems = tasks)
    .then(() => updateAllTasks(taskItems, true))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(6)
      expect(tmpObj.tasksDone).toBeGreaterThan(3)
      done()
    })
  })

  test('Completing all tasks should update a projects to be done', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 6))
    .then(tasks => taskItems = tasks)
    .then(() => updateAllTasks(taskItems, true))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(6)
      expect(tmpObj.tasksDone).toBe(6)
      expect(tmpObj.isDone).toBe(true)
      done()
    })
  })

  test('Adding a new task to a completed project should no longer be complete', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 6))
    .then(tasks => taskItems = tasks)
    .then(() => updateAllTasks(taskItems, true))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(6)
      expect(tmpObj.tasksDone).toBe(6)
      expect(tmpObj.isDone).toBe(true)
    })
    .then(() => createTask(projectID))
    .then(newTask => taskItems.push(newTask))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(7)
      expect(tmpObj.tasksDone).toBe(6)
      expect(tmpObj.isDone).toBe(false)
      done()
    })
  })

  test('Deleting a task of a completed project it should remain as complete', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 6))
    .then(tasks => taskItems = tasks)
    .then(() => updateAllTasks(taskItems, true))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(6)
      expect(tmpObj.tasksDone).toBe(6)
      expect(tmpObj.isDone).toBe(true)
    })
    .then(() => deleteTask(taskItems[0].id))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(5)
      expect(tmpObj.tasksDone).toBe(5)
      expect(tmpObj.isDone).toBe(true)
      done()
    })
  })

  test('Deleting a project should remove all the related tasks', (done) => {
    let projectID = null
    let taskItems = []
    return createProject()
    .then(item => {
      projectID = item.id
      expect(item.tasksTotal).toBe(0)
      expect(item.tasksDone).toBe(0)
      expect(item.isDone).toBe(false)
    })
    .then(() => createAllTasks(projectID, 3))
    .then(tasks => taskItems = tasks)
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(() => getProjectById(projectID))
    .then(tmpObj => {
      expect(tmpObj.tasksTotal).toBe(3)
      expect(tmpObj.tasksDone).toBe(0)
      expect(tmpObj.isDone).toBe(false)
    })
    .then(() => deleteProjectById(projectID))
    .then(item => {
      expect(item.status).toBe(202)
      expect(item.message).toBe(constants.messages.SUCCESS_DELETED_PROJECT)
    })
    .then(() => createAllTasks(232, 6)) // slight time waste
    .then(() => {
      const allPromises = taskItems.map(item => {
        return dbConnection.Query(
          taskServiceQueries.DB_GET_TASK_BY_ID,
          [taskItems[0].id])
      })

      return Promise.all(allPromises)
    })
    .then(result => {
      result.forEach(item => expect(item.length).toBe(0))
      done()
    })
  })

})
