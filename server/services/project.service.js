const sanitizer = require('sanitizer')
const logger = require('./logger.js')
const has = require('../helpers/has.js')
const config = require('../config/config.js')
const db = require('../interfaces/db_init_sql.js')
const mysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_PROJECTS= 'projects'
const DB_READY = 'db-ready'
const DB_READY_PROJECTS = 'db-ready-projects'
const DB_SHOW_PROJECTS = 'SELECT * FROM projects ORDER BY updated DESC'
const DB_CREATE_PROJECT = 'INSERT INTO projects SET ?'
const DB_DELETE_PROJECT_BY_ID = 'DELETE FROM projects WHERE id = ?'
const DB_DELETE_PROJECTS_BY_USER = 'SELECT * FROM projects WHERE user = ?'
const DB_GET_PROJECT_BY_ID = 'SELECT * FROM projects WHERE id = ?'
const DB_GET_PROJECT_BY_USER = 'SELECT * FROM projects WHERE user = ?'
const DB_GET_PROJECT_BY_USER_DESC = 'SELECT * FROM projects WHERE user = ? ORDER BY ? DESC'
const DB_GET_PROJECT_BY_USER_DONE = 'SELECT * FROM projects WHERE user = ? AND isDone = ? ORDER BY updated DESC'
const DB_GET_PROJECT_BY_NAME = 'SELECT * FROM projects WHERE name = ? ORDER BY updated DESC'
const DB_GET_PROJECTS_BY_IS_DONE = 'SELECT * FROM projects WHERE user = ? AND isDone = ? ORDER BY updated DESC'
const DB_GET_PROJECTS_BY_IS_DONE_DATE = 'SELECT * FROM projects WHERE doneDate = ? ORDER BY doneDate DESC'

const DB_SET = ' SET'
const DB_SET_USER = ' user = ?'
const DB_SET_NAME= ' name = ?'
const DB_SET_IS_DONE = ' isDone = ?'
const DB_SET_TASKS_TOTAL = ' tasksTotal = ?'
const DB_SET_TASKS_DONE = ' tasksDone = ?'
const DB_SET_DONE_DATE = ' doneDate = ?'
const DB_SET_CREATED = ' created = ?'
const DB_SET_UPDATED = ' updated = ?'
const DB_WHERE = ' WHERE id = ?'

const DB_CREATE_PROJECTS_TABLE = 'CREATE TABLE projects ' +
  '(id int auto_increment primary key, ' +
  'user int default "-1" not null, ' +
  'name VARCHAR(150) not null, ' +
  'created DATETIME default now() not null, ' +
  'updated DATETIME default now() not null, ' +
  'tasksTotal int default "0" not null, ' +
  'tasksDone int default "0" not null, ' +
  'isDone bool default FALSE, ' +
  'doneDate DATETIME) ' +
  'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci'

// todo: future optimisation by indexing certain columns for quicker searches

const ALL_QUERIES = {
  DB_SHOW_PROJECTS,
  DB_CREATE_PROJECT,
  DB_DELETE_PROJECT_BY_ID,
  DB_DELETE_PROJECTS_BY_USER,
  DB_GET_PROJECT_BY_ID,
  DB_GET_PROJECT_BY_USER,
  DB_GET_PROJECT_BY_NAME,
  DB_GET_PROJECTS_BY_IS_DONE,
  DB_GET_PROJECTS_BY_IS_DONE_DATE
}

exports.ALL_QUERIES = ALL_QUERIES


function InitProjects() {
  return db.InitTable(DB_PROJECTS, DB_CREATE_PROJECTS_TABLE, DB_READY_PROJECTS)
}

function CheckProjects() {
  return getStats()
  .then(result => {
    logger.Log( 'Projects')
    logger.Log( ` \t all \t ${result.all}`)
    logger.Log( ` \t done \t ${result.done}`)
  })
}

function getStats () {
  return GetAllProjects()
  .then(items => {
    const allTasks = items.length
    const doneTasks = items.filter(item => item.isDone > 0).length
    return {
      all: allTasks,
      done: doneTasks
    }
  })
}

exports.getStats = getStats

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
function Update({ id, name, user, tasksTotal, tasksDone, isDone }) {
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

  if (has.hasAnItem(tasksTotal)) {
    tmpSQLCommand.push(DB_SET_TASKS_TOTAL)
    tmpSQLVars.push(tasksTotal)
  }

  if (has.hasAnItem(tasksDone)) {
    tmpSQLCommand.push(DB_SET_TASKS_DONE)
    tmpSQLVars.push(tasksDone)
  }

  if (has.hasAnItem(isDone)) {
    let value = isDone ? 1 : 0
    tmpSQLCommand.push(DB_SET_IS_DONE)
    tmpSQLVars.push(value)

    tmpSQLCommand.push(DB_SET_DONE_DATE)
    if (isDone) {
      tmpSQLVars.push(new Date())
    } else {
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
 * @param   {string}  name    project name
 * @return  {array}   project object
 */
function GetProjectByName(name) {
  return db.Query(DB_GET_PROJECT_BY_NAME, [name])
}

exports.GetProjectByName = GetProjectByName

/**
 * Returns all project objects from the db if found via user
 *
 * @param   {int}     user      user id
 * @param   {int}     showDone  return based on state of project
 * @return  {array}   project object
 */
function GetProjectsByUser(user,
  { showDone= true,
    sortAsc = true,
    sortType = 'updated'}) {

  const SHOW_DONE = showDone? '' :  ' AND isDone = 0'
  const ORDER_BY = ` ORDER BY ${sortType} `
  // todo this is a horrible way to do this!!
  const SORT_ASC = sortAsc ? ' DESC': ''

  let SearchTerm = DB_GET_PROJECT_BY_USER + SHOW_DONE + ORDER_BY + SORT_ASC

  return db.Query(SearchTerm, [user])
}

exports.GetProjectsByUser = GetProjectsByUser

/**
 * Deletes all project objects from the db via user id
 *
 * @param   {int}     user      user id
 * @return  {array}   project object
 */
function DeleteProjectsByUser(user) {
  return db.Query(DB_DELETE_PROJECTS_BY_USER, [user])
}

exports.DeleteProjectsByUser = DeleteProjectsByUser

/**
 * Returns all project objects by the isDone value
 *
 * @param   {number}  user id
 * @param   {bool}    isDone
 * @return  {array}   project object
 */
function GetProjectsByIsDone(user, isDone) {
  return db.Query(DB_GET_PROJECTS_BY_IS_DONE, [user, isDone === true? 1: 0])
}

exports.GetProjectsByIsDone = GetProjectsByIsDone

/**
 * Returns all project objects by the done date
 *
 * @param   {bool}    doneDate
 * @return  {array}   project object
 */
function GetProjectsByDoneDate(doneDate) {
  // todo make this work better with dates before & after .. pagination support here
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
    freshProject.name = sanitizer.unescapeEntities(projectData.name)
  }

  if (has.hasAnItem(projectData.user)) {
    freshProject.user = projectData.user
  }

  if (has.hasAnItem(projectData.tasksTotal)) {
    freshProject.tasksTotal = projectData.tasksTotal
  }

  if (has.hasAnItem(projectData.tasksDone)) {
    freshProject.tasksDone = projectData.tasksDone
  }

  if (has.hasAnItem(projectData.isDone)) {
    freshProject.isDone = projectData.isDone === 1
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
