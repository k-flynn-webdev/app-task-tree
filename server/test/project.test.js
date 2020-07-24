//Require the dev-dependencies
const dbConnection = require('../interfaces/db_init_sql')
const projectServiceQueries = require('../services/project.service').ALL_QUERIES
const taskServiceQueries = require('../services/task.service').ALL_QUERIES
const token = require('../services/token.service')
const user = require('../services/user.service')
const constants = require('../constants/index')
const config = require('../config/config.js')
const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)


let projectObj = null
let projectUser = 111
let projectName = 'This is a test project created by a project.test'

beforeAll(() => {
  dbConnection.Connect()
  return dbConnection.SelectDB(config.db.database)
  .then(() => {
    userToken = createUserToken()
  })
})

afterAll(() => {
  dbConnection.Close()
})

userDetails = {
  id: 201,
  name: 'testName',
  email: 'test@email.com',
  password: 'ANON1234',
  role: constants.roles.ANON }

const createUserToken = () => {
  return token.Create(userDetails)
}

describe('Projects', () => {

  test('Should not create a new project with a empty object', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({})
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing name field.")
      done()
    })
  })

  test('Should not create a new project without a user id', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      name: projectName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing user field.")
      done()
    })
  })

  test('Should not create a new project with a invalid user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      user: -1,
      name: projectName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The user must be valid.")
      done()
    })
  })

  test('Should not create a new project with a invalid user #2', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      user: 'ds23',
      name: projectName })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The user must be valid.")
      done()
    })
  })

  test('Should not create a new project with a missing name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      user: projectUser })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("Missing name field.")
      done()
    })
  })

  test('Should not create a new project with a small name property', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      user: projectUser,
      name: 'sam' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.text).toBeDefined()
      expect(res.body.message).toBeDefined()
      expect(res.body.message).toEqual("The name must be at least 4 characters long.")
      done()
    })
  })

  test('Should create a new project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .post(constants.paths.API_PROJECT_CREATE)
    .set('Authorization', `Bearer ${userToken}`)
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
      done()
    })
  })

  test("Should not return a project that's invalid", (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT('sdf35rs'))
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body.message).toEqual('The project parameter must be valid.')
      done()
    })
  })

  test("Should not return a project that does not exist", (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(23432423))
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.PROJECT_NOT_FOUND)
      done()
    })
  })

  test('Should return the correct project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(projectObj.id))
    .set('Authorization', `Bearer ${userToken}`)
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

  test("Should not update a project that doesn't exist", (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_PROJECT(2357))
    .set('Authorization', `Bearer ${userToken}`)
    .send({ id: 2357, name: 'dsfdsdsf' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.PROJECT_NOT_FOUND)
      done()
    })
  })

  test('Should not update project name with invalid name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_PROJECT(projectObj.id))
    .set('Authorization', `Bearer ${userToken}`)
    .send({ id: projectObj.id, name: 'err' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body.message).toEqual('The name must be at least 4 characters long.')
      done()
    })
  })

  const updatedName = 'This should be the updated NAME here bla 1234'

  test('Should update project name', (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_PROJECT(projectObj.id))
    .set('Authorization', `Bearer ${userToken}`)
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

  test('Should not return an array of projects with a user that does not exist', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + 23131)
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_PROJECTS) !== -1)
      expect(res.body.data.projects.length).toBe(0)
      done()
    })
  })

  test('Should not return an array of projects with a user that is invalid', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + 'ad3e')
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(400)
      expect(res.body.message).toEqual('The user parameter must be valid.')
      done()
    })
  })

  test('Should return an array of projects related to user', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + projectUser)
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_PROJECTS) !== -1)
      expect(res.body.data.projects.length).toBeGreaterThan(0)
      done()
    })
  })

  test("Should not delete a project that doesn't exist", (done) => {
    chai.request(config.ip + ':' + config.port)
    .patch(constants.paths.API_PROJECT(2357))
    .set('Authorization', `Bearer ${userToken}`)
    .send({ id: 2357, name: 'dsfdsdsf' })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.PROJECT_NOT_FOUND)
      done()
    })
  })

  test('Should delete the project', (done) => {
    chai.request(config.ip + ':' + config.port)
    .delete(constants.paths.API_PROJECT(projectObj.id))
    .set('Authorization', `Bearer ${userToken}`)
    .send({ id: projectObj.id })
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(202)
      expect(res.body.message).toEqual(constants.messages.SUCCESS_DELETED_PROJECT)
      done()
    })
  })

  test('A project should not return after being deleted', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECT(projectObj.id))
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(404)
      expect(res.body.message).toEqual(constants.errors.PROJECT_NOT_FOUND)
      done()
    })
  })

  test('If no projects found relating to a user an empty array should return', (done) => {
    chai.request(config.ip + ':' + config.port)
    .get(constants.paths.API_PROJECTS + '?user=' + projectUser)
    .set('Authorization', `Bearer ${userToken}`)
    .end(function(err, res){
      expect(res).toBeDefined()
      expect(res.status).toBe(200)
      expect(res.body.message.indexOf(constants.messages.SUCCESS_FOUND_PROJECTS) !== -1)
      expect(res.body.data.projects.length).toBe(0)
      done()
    })
  })

})
