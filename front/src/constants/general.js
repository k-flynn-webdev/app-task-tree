const DELAY = 500
const DELAY_SHORT = 250
const DELAY_BLIP = 33
const DELAY_SUCCESS = 900
const DELAY_ERROR = 6000

const DEFAULT_PROJECT = (user = -1) => {
  return { id: -1, name: 'Project', user: user, tasksDone: 0, tasksTotal: 0 }
}

const DEFAULT_PROJECT_NO_ID = (user = -1) => {
  return { name: 'Project', user: user, tasksDone: 0, tasksTotal: 0 }
}

const DEFAULT_TASK = (user = -1) => {
  return { id: -1, text: 'Task', project: -1, user: user, isDone: false }
}

export default {
  DELAY,
  DELAY_BLIP,
  DELAY_SHORT,
  DELAY_SUCCESS,
  DELAY_ERROR,
  DEFAULT_PROJECT,
  DEFAULT_PROJECT_NO_ID,
  DEFAULT_TASK
}
