const logger = require('./logger.js')
const has = require('../helpers/has.js')
const config = require('../config/config.js')
const db = require('../interfaces/db_init_sql.js')
const mysqlVal = require('../helpers/MYSQL_value.js')

const ERROR = 'error'
const DB_TASKS= 'tasks'
const DB_READY = 'db-ready'
const DB_READY_TASKS = 'db-ready-tasks'
const DB_SHOW_TASKS = 'SELECT * FROM tasks ORDER BY created DESC'
const DB_CREATE_TASK = 'INSERT INTO tasks SET ?'
const DB_DELETE_TASK_BY_ID = 'DELETE FROM tasks WHERE id = ?'
const DB_GET_TASK_BY_ID = 'SELECT * FROM tasks WHERE id = ?'
const DB_GET_TASK_BY_USER = 'SELECT * FROM tasks WHERE user = ? ORDER BY created DESC'
const DB_GET_TASK_BY_PROJECT = 'SELECT * FROM tasks WHERE project = ? ORDER BY created DESC'
const DB_GET_TASK_BY_IS_DONE = 'SELECT * FROM tasks WHERE isDone = ? ORDER BY created DESC'
const DB_GET_TASK_BY_IS_DONE_DATE = 'SELECT * FROM tasks WHERE doneDate = ? ORDER BY created DESC'

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
  'doneDate DATETIME )'

function InitTasks() {
  return db.InitTable(DB_TASKS, DB_CREATE_TASKS_TABLE, DB_READY_TASKS)
}

function CheckTasks() {
  return GetAllTasks()
  .then((items) => {
    logger.Log(items.length + ' Tasks found')
  })
}

function Init(app) {
  app.on(DB_READY, InitTasks)
  app.on(DB_READY_TASKS, CheckTasks)
}

exports.Init = Init

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
 * @return  {array}   task object
 */
function GetTasksByProject(project) {
  return db.Query(DB_GET_TASK_BY_PROJECT, [project])
}

exports.GetTasksByProject = GetTasksByProject

/**
 * Returns all task objects from the db if found via user
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
 * @param   {bool}    isDone
 * @return  {array}  task object
 */
function GetTasksByIsDone(isDone) {
  return db.Query(DB_GET_TASK_BY_IS_DONE, [isDone])
}

exports.GetTasksByIsDone = GetTasksByIsDone

/**
 * Returns all task objects that are done
 *
 * @param   {bool}    isDone
 * @return  {array}  task object
 */
function GetTasksByDoneDate(doneDate) {
  // todo make this work better with dates before & after ..
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
    freshTask.text = taskData.text
  }

  if (has.hasAnItem(taskData.project)) {
    freshTask.project = taskData.project
  }

  if (has.hasAnItem(taskData.user)) {
    freshTask.user = taskData.user
  }

  if (has.hasAnItem(taskData.isDone)) {
    freshTask.isDone = taskData.isDone
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
