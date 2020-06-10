const logger = require('./logger.js')
const has = require('../helpers/has.js')
const config = require('../config/config.js')
const db = require('../interfaces/db_init_sql.js')
const mysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_PROJECTS= 'projects'
const DB_READY = 'db-ready'
const DB_READY_PROJECTS = 'db-ready-projects'
const DB_SHOW_PROJECTS = 'SELECT * FROM projects'
const DB_CREATE_PROJECT = 'INSERT INTO projects SET ?'
const DB_DELETE_PROJECT_BY_ID = 'DELETE FROM projects WHERE id = ?'
const DB_GET_PROJECT_BY_ID = 'SELECT * FROM projects WHERE id = ?'
const DB_GET_PROJECT_BY_USER = 'SELECT * FROM projects WHERE user = ?'
const DB_GET_PROJECT_BY_NAME = 'SELECT * FROM projects WHERE name = ?'
const DB_GET_PROJECTS_BY_IS_DONE = 'SELECT * FROM projects WHERE isDone = ?'
const DB_GET_PROJECTS_BY_IS_DONE_DATE = 'SELECT * FROM projects WHERE doneDate = ?'

const DB_SET = ' SET'
const DB_SET_USER = ' user = ?'
const DB_SET_NAME= ' name = ?'
const DB_SET_IS_DONE = ' isDone = ?'
const DB_SET_DONE_DATE = ' doneDate = ?'
const DB_SET_CREATED = ' created = ?'
const DB_SET_UPDATED = ' updated = ?'
const DB_WHERE = ' WHERE id = ?'

const DB_CREATE_PROJECTS_TABLE = 'CREATE TABLE projects ' +
  '(id int auto_increment primary key, ' +
  'user int default "-1" not null, ' +
  'name VARCHAR(50) not null, ' +
  'created DATETIME default now() not null, ' +
  'updated DATETIME default now() not null, ' +
  'isDone bool default FALSE, ' +
  'doneDate DATETIME )'

function InitProjects() {
  return db.InitTable(DB_PROJECTS, DB_CREATE_PROJECTS_TABLE, DB_READY_PROJECTS)
}

function CheckProjects() {
  return GetAllProjects()
  .then((items) => {
    logger.Log(items.length + ' Projects found')
  })
}

function Init(app) {
  app.on(DB_READY, InitProjects)
  app.on(DB_READY_PROJECTS, CheckProjects)
}

exports.Init = Init

/**
 * Returns a new basic project object and saves to db
 *
 * @param   {object}  project data
 * @return  {object}  project object
 */
function Create({ name, user }) {
  return db.Query(DB_CREATE_PROJECT, { name, user })
}

exports.Create = Create

/**
 * Updates a project object and saves to db
 *
 * @param   {object}  project data
 * @return  {object}  project object
 */
function Update({ id, name, user, isDone }) {
  const JOIN_CHAR = ','
  let tmpSQLVars = []
  let tmpSQLStart = 'UPDATE ' + DB_PROJECTS + DB_SET
  let tmpSQLCommand = []

  function CreateSQLQuery() {
    return tmpSQLStart + tmpSQLCommand.join(JOIN_CHAR) + DB_WHERE
  }

  if (has.hasAnItem(name)) {
    tmpSQLCommand.push(DB_SET_NAME)
    tmpSQLVars.push(name.trim())
  }

  if (has.hasAnItem(user)) {
    tmpSQLCommand.push(DB_SET_USER)
    tmpSQLVars.push(user)
  }

  if (has.hasAnItem(isDone)) {
    let value = isDone ? 1 : 0
    tmpSQLCommand.push(DB_SET_IS_DONE)
    tmpSQLVars.push(value)
    if (isDone) {
      tmpSQLCommand.push(DB_SET_DONE_DATE)
      tmpSQLVars.push(new Date())
    } else {
      tmpSQLCommand.push(DB_SET_DONE_DATE)
      tmpSQLVars.push(undefined)
    }
  }

  tmpSQLCommand.push(DB_SET_UPDATED)
  tmpSQLVars.push(new Date())

  tmpSQLVars.push(id)
  return db.Query(CreateSQLQuery(), tmpSQLVars)
}

exports.Update = Update

/**
 * Deletes a project object and updates the db
 *
 * @param   {int}     id  project id
 * @return  {object}  project object
 */
function Delete(id) {
  return db.Query(DB_DELETE_PROJECT_BY_ID, [id])
}

exports.Delete = Delete

/**
 * Returns all project objects
 *
 * @return  {array}  project objects
 */
function GetAllProjects() {
  return db.Query(DB_SHOW_PROJECTS)
}

exports.GetAllProjects = GetAllProjects

/**
 * Returns a project object from the db if found via id int
 *
 * @param   {int}     id
 * @return  {object}  project object
 */
function GetProjectByID(id) {
  return db.Query(DB_GET_PROJECT_BY_ID, [id])
}

exports.GetProjectByID = GetProjectByID

/**
 * Returns all project objects from the db if found via name
 *
 * @param   {string}  project
 * @return  {array}   project object
 */
function GetProjectByName(name) {
  return db.Query(DB_GET_PROJECT_BY_NAME, [name])
}

exports.GetProjectByName = GetProjectByName

/**
 * Returns all project objects from the db if found via user
 *
 * @param   {int}     user
 * @return  {array}   project object
 */
function GetProjectsByUser(user) {
  return db.Query(DB_GET_PROJECT_BY_USER, [user])
}

exports.GetProjectsByUser = GetProjectsByUser

/**
 * Returns all project objects by the isDone value
 *
 * @param   {bool}    isDone
 * @return  {array}   project object
 */
function GetProjectsByIsDone(isDone) {
  return db.Query(DB_GET_PROJECTS_BY_IS_DONE, [isDone])
}

exports.GetProjectsByIsDone = GetProjectsByIsDone

/**
 * Returns all project objects by the done date
 *
 * @param   {bool}    doneDate
 * @return  {array}   project object
 */
function GetProjectsByDoneDate(doneDate) {
  // todo make this work better with dates before & after ..
  return db.Query(DB_GET_PROJECTS_BY_IS_DONE_DATE, [doneDate])
}

exports.GetProjectsByDoneDate = GetProjectsByDoneDate

/**
 * Export a project model with only the items needed.
 *
 * @param 	{object}	projectData  project data
 * @returns {model}	  projectModel minus items
 */
function SafeExport(projectData) {

  let freshProject = {}

  if (has.hasAnItem(projectData.id)) {
    freshProject.id = projectData.id
  }

  if (has.hasAnItem(projectData.name)) {
    freshProject.name = projectData.name
  }

  if (has.hasAnItem(projectData.user)) {
    freshProject.user = projectData.user
  }

  if (has.hasAnItem(projectData.isDone)) {
    freshProject.isDone = projectData.isDone
    freshProject.doneDate = projectData.doneDate
  }

  if (has.hasAnItem(projectData.created)) {
    freshProject.created = projectData.created
  }

  if (has.hasAnItem(projectData.updated)) {
    freshProject.updated = projectData.updated
  }

  return freshProject
}

exports.SafeExport = SafeExport