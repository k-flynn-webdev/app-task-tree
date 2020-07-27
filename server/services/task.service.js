const sanitizer = require('sanitizer')
const logger = require('./logger.js')
const has = require('../helpers/has.js')
const config = require('../config/config.js')
const db = require('../interfaces/db_init_sql.js')
const mysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_TASKS= 'tasks'
const DB_READY = 'db-ready'
const DB_READY_TASKS = 'db-ready-tasks'
const DB_SHOW_TASKS = 'SELECT * FROM tasks ORDER BY updated DESC'
const DB_CREATE_TASK = 'INSERT INTO tasks SET ?'
const DB_DELETE_TASK_BY_ID = 'DELETE FROM tasks WHERE id = ?'
const DB_DELETE_TASKS_BY_USER = 'DELETE FROM tasks WHERE user = ?'
const DB_DELETE_TASKS_BY_PROJECT = 'DELETE FROM tasks WHERE project = ?'
const DB_GET_TASK_BY_ID = 'SELECT * FROM tasks WHERE id = ?'
const DB_GET_TASK_BY_USER = 'SELECT * FROM tasks WHERE user = ? ORDER BY updated DESC'
const DB_GET_TASK_BY_PROJECT = 'SELECT * FROM tasks WHERE project = ? ORDER BY updated DESC'
const DB_GET_TASK_BY_PROJECT_AND_DONE = 'SELECT * FROM tasks WHERE project = ? AND isDone = ? ORDER BY updated DESC'
const DB_GET_TASK_BY_IS_DONE = 'SELECT * FROM tasks WHERE user = ? AND isDone = ? ORDER BY updated DESC'
const DB_GET_TASK_BY_IS_DONE_DATE = 'SELECT * FROM tasks WHERE doneDate = ? ORDER BY doneDate DESC'

const DB_SET = ' SET'
const DB_SET_USER = ' user = ?'
const DB_SET_TEXT = ' text = ?'
const DB_SET_PROJECT = ' project = ?'
const DB_SET_IS_DONE = ' isDone = ?'
const DB_SET_DONE_DATE = ' doneDate = ?'
const DB_SET_CREATED = ' created = ?'
const DB_SET_UPDATED = ' updated = ?'
const DB_WHERE = ' WHERE id = ?'

const DB_CREATE_TASKS_TABLE = 'CREATE TABLE tasks ' +
  '(id int auto_increment primary key, ' +
  'project int default "-1" not null, ' +
  'user int default "-1" not null, ' +
  'text VARCHAR(150) not null, ' +
  'created DATETIME default now() not null, ' +
  'updated DATETIME default now() not null, ' +
  'isDone bool default FALSE, ' +
  'doneDate DATETIME) ' +
  'ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci'

// todo: future optimisation by indexing certain columns for quicker searches

ALL_QUERIES = {
  DB_SHOW_TASKS,
  DB_CREATE_TASK,
  DB_DELETE_TASK_BY_ID,
  DB_DELETE_TASKS_BY_USER,
  DB_DELETE_TASKS_BY_PROJECT,
  DB_GET_TASK_BY_ID,
  DB_GET_TASK_BY_USER,
  DB_GET_TASK_BY_PROJECT,
  DB_GET_TASK_BY_IS_DONE,
  DB_GET_TASK_BY_IS_DONE_DATE
}

exports.ALL_QUERIES = ALL_QUERIES

function InitTasks() {
  return db.InitTable(DB_TASKS, DB_CREATE_TASKS_TABLE, DB_READY_TASKS)
}

function CheckTasks() {
  return getStats()
  .then(result => {
    logger.Log( 'Tasks')
    logger.Log( ` \t all \t ${result.all}`)
    logger.Log( ` \t done \t ${result.done}`)
  })
}

function Init(app) {
  app.on(DB_READY, InitTasks)
  app.on(DB_READY_TASKS, CheckTasks)
}

exports.Init = Init

function getStats () {
  return GetAllTasks()
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

/**
 * Returns a new basic task object and saves to db
 *
 * @param   {object}  task data
 * @return  {object}  task object
 */
function Create({ text, project, user }) {
  return db.Query(DB_CREATE_TASK, { text, project, user })
}

exports.Create = Create

/**
 * Updates a task object and saves to db
 *
 * @param   {object}  task data
 * @return  {object}  task object
 */
function Update({ id, text, project, user, isDone }) {
  const JOIN_CHAR = ','
  let tmpSQLVars = []
  let tmpSQLStart = 'UPDATE ' + DB_TASKS + DB_SET
  let tmpSQLCommand = []

  function CreateSQLQuery() {
    return tmpSQLStart + tmpSQLCommand.join(JOIN_CHAR) + DB_WHERE
  }

  if (has.hasAnItem(text)) {
    tmpSQLCommand.push(DB_SET_TEXT)
    tmpSQLVars.push(text.trim())
  }

  if (has.hasAnItem(project)) {
    tmpSQLCommand.push(DB_SET_PROJECT)
    tmpSQLVars.push(project)
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
 * Deletes a task object and updates the db
 *
 * @param   {int}     id  task id
 * @return  {object}  mysql packet
 */
function Delete(id) {
  return db.Query(DB_DELETE_TASK_BY_ID, [id])
}

exports.Delete = Delete

/**
 * Returns all task objects
 *
 * @return  {array}  task objects
 */
function GetAllTasks() {
  return db.Query(DB_SHOW_TASKS)
}

exports.GetAllTasks = GetAllTasks

/**
 * Returns a task object from the db if found via id int
 *
 * @param   {int}     id
 * @return  {object}  task object
 */
function GetTaskByID(id) {
  return db.Query(DB_GET_TASK_BY_ID, [id])
}

exports.GetTaskByID = GetTaskByID

/**
 * Returns all task objects from the db if found via project
 *
 * @param   {int}     project
 * @param   {int}     showDone
 * @return  {array}   task object
 */
function GetTasksByProject(project, showDone = null) {
  if (has.hasAnItem(showDone)) {
    return db.Query(DB_GET_TASK_BY_PROJECT_AND_DONE, [project, showDone])
  }
  return db.Query(DB_GET_TASK_BY_PROJECT, [project])
}

exports.GetTasksByProject = GetTasksByProject

/**
 * Deletes all task objects from the db via user id
 *
 * @param   {int}     user
 * @return  {array}   task object
 */
function DeleteTasksByUser(user) {
  return db.Query(DB_DELETE_TASKS_BY_USER, [user])
}

exports.DeleteTasksByUser = DeleteTasksByUser

/**
 * Deletes all task objects from the db via project id
 *
 * @param   {int}     project
 * @return  {array}   task object
 */
function DeleteTasksByProject(project) {
  return db.Query(DB_DELETE_TASKS_BY_PROJECT, [project])
}

exports.DeleteTasksByProject = DeleteTasksByProject

/**
 * Returns all task objects from the db if found via user id
 *
 * @param   {int}     user
 * @return  {array}   task object
 */
function GetTasksByUser(user) {
  return db.Query(DB_GET_TASK_BY_USER, [user])
}

exports.GetTasksByUser = GetTasksByUser

/**
 * Returns all task objects that are done
 *
 * @param   {number}  user
 * @param   {bool}    isDone
 * @return  {array}   task object
 */
function GetTasksByIsDone(user, isDone) {
  return db.Query(DB_GET_TASK_BY_IS_DONE, [user, isDone === true? 1: 0 ])
}

exports.GetTasksByIsDone = GetTasksByIsDone

/**
 * Returns all task objects that are done
 *
 * @param   {bool}    isDone
 * @return  {array}  task object
 */
function GetTasksByDoneDate(doneDate) {
  // todo make this work better with dates before & after .. pagination support needed
  return db.Query(DB_GET_TASK_BY_IS_DONE_DATE, [doneDate])
}

exports.GetTasksByDoneDate = GetTasksByDoneDate

/**
 * Export a task model with only the items needed.
 *
 * @param 	{object}	taskData  task data
 * @returns {model}		          taskModel minus items
 */
function SafeExport(taskData) {

  let freshTask = {}

  if (has.hasAnItem(taskData.id)) {
    freshTask.id = taskData.id
  }

  if (has.hasAnItem(taskData.text)) {
    freshTask.text = sanitizer.unescapeEntities(taskData.text)
  }

  if (has.hasAnItem(taskData.project)) {
    freshTask.project = taskData.project
  }

  if (has.hasAnItem(taskData.user)) {
    freshTask.user = taskData.user
  }

  if (has.hasAnItem(taskData.isDone)) {
    freshTask.isDone = taskData.isDone === 1
    freshTask.doneDate = taskData.doneDate
  }

  if (has.hasAnItem(taskData.created)) {
    freshTask.created = taskData.created
  }

  if (has.hasAnItem(taskData.updated)) {
    freshTask.updated = taskData.updated
  }

  return freshTask
}

exports.SafeExport = SafeExport
