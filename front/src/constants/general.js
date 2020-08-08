
const DELAY = 500
const DELAY_SHORT = 250
const DELAY_BLIP = 33
const DELAY_SUCCESS = 900
const DELAY_ERROR = 6000

/**
 * @returns {User}
 * @constructor
 */
const DEFAULT_USER = () => {
  return {
    id: -1,
    name: '',
    email: '',
    role: '',
    meta: {}
  }
}

/**
 * @returns {UserOptions}
 * @constructor
 */
const DEFAULT_USER_OPTIONS = () => {
  return {
    tasks: {
      showDone: true
    },
    projects: {
      showDone: true
    },
    sort: {
      asc: false,
      type: 'updated'
    }
  }
}

/**
 * @typedef {object} OptionShowDone
 * @property {boolean}  showDone      Show done state
 */
/**
 * @typedef {object} OptionSort
 * @property {boolean}  asc           Direction of sorting [ asc - desc]
 * @property {string}   type          type of sort [ update | created | done | scale ]
 */
/**
 * @typedef {object} UserOptions
 *
 * @property {OptionShowDone}   tasks     Task options
 * @property {OptionShowDone}   projects  Project options
 * @property {OptionSort}       sort      Sorting options of Tasks/Projects
 */

/**
 * @returns {TaskHistory}
 * @constructor
 */
const DEFAULT_TASK_HISTORY = () => {
  return {
    project: -1,
    showDone: null,
    sortAsc: null,
    sortType: ''
  }
}

/**
 * @typedef {object} TaskHistory
 *
 * @property {number}     project     Project Id
 * @property {boolean}    showDone    showDone state of last API call
 * @property {boolean}    sortAsc     sortAsc state of last API call
 * @property {string}     sortType    sortType state of last API call
 */

/**
 * @returns {ProjectHistory}
 * @constructor
 */
const DEFAULT_PROJECT_HISTORY = () => {
  return {
    user: -1,
    showDone: null,
    sortAsc: null,
    sortType: ''
  }
}

/**
 * @typedef {object} ProjectHistory
 *
 * @property {number}     user        User Id
 * @property {boolean}    showDone    showDone state of last API call
 * @property {boolean}    sortAsc     sortAsc state of last API call
 * @property {string}     sortType    sortType state of last API call
 */

/**
 * @param user
 * @returns {Project}
 * @constructor
 */
const DEFAULT_PROJECT = (user = -1) => {
  return {
    id: -1,
    name: 'New Project',
    user: user,
    tasksDone: 0,
    tasksTotal: 0,
    isDone: false,
    doneDate: null
  }
}

/**
 * @param user
 * @returns {Project}
 * @constructor
 */
const DEFAULT_PROJECT_NO_ID = (user = -1) => {
  return {
    name: 'New Project',
    user: user,
    tasksDone: 0,
    tasksTotal: 0,
    isDone: false,
    doneDate: null
  }
}

/**
 * @param user
 * @returns {Task}
 * @constructor
 */
const DEFAULT_TASK = (user = -1) => {
  return {
    id: -1,
    text: 'New Task',
    project: -1,
    user: user,
    isDone: false
  }
}

/**
 * @returns {UserTotals}
 * @constructor
 */
const DEFAULT_TOTALS = () => {
  return {
    tasks: 0,
    tasksDone: 0,
    projects: 0,
    projectsDone: 0
  }
}

/**
 * @typedef {object} UserTotals
 *
 * @property {number}     tasks           Total tasks
 * @property {number}     tasksDone       Total tasks done
 * @property {number}     projects        Total projects
 * @property {number}     projectsDone    Total projects done
 */

export default {
  DELAY,
  DELAY_BLIP,
  DELAY_SHORT,
  DELAY_SUCCESS,
  DELAY_ERROR,
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_NO_ID,
  DEFAULT_TASK,
  DEFAULT_USER,
  DEFAULT_USER_OPTIONS,
  DEFAULT_TOTALS,
  DEFAULT_TASK_HISTORY,
  DEFAULT_PROJECT_HISTORY
}
