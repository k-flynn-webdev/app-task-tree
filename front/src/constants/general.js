
const DELAY = 500
const DELAY_SHORT = 250
const DELAY_BLIP = 33
const DELAY_SUCCESS = 900
const DELAY_ERROR = 6000

const DEFAULT_USER = () => {
  return {
    id: -1,
    name: '',
    email: '',
    role: '',
    meta: {}
  }
}

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

const DEFAULT_TASK_HISTORY = () => {
  return {
    user: -1,
    project: -1,
    showDone: null,
    sortAsc: null,
    sortType: ''
  }
}

const DEFAULT_PROJECT_HISTORY = () => {
  return {
    user: -1,
    showDone: null,
    sortAsc: null,
    sortType: ''
  }
}

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

const DEFAULT_TASK = (user = -1) => {
  return {
    id: -1,
    text: 'New Task',
    project: -1,
    user: user,
    isDone: false
  }
}

const DEFAULT_TOTALS = () => {
  return {
    tasks: 0,
    tasksDone: 0,
    projects: 0,
    projectsDone: 0
  }
}

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
