/**
 * Add a time delayed action
 *
 * @param {function}  action  function to fire after delay
 * @param {int}       delay   time delay of function
 * @returns {number}  returns setTimeout ID
 */
const timeDelay = (action, delay) => {
  return setTimeout(function () {
    action()
  }, delay)
}

const renderDate = (input) => {
  if (!input) return 'No date'
  const dateObj = new Date(input)
  return dateObj.toLocaleDateString()
}

const renderTime = (input) => {
  if (!input) return 'No date'
  const dateObj = new Date(input)
  let hours = dateObj.getHours()
  const isPM = (hours > 12)
  if (isPM) {
    hours = hours - 12
  }
  if (hours < 10) {
    hours = '0' + hours
  }
  const amPm = isPM ? ' pm' : ' am'
  let mins = dateObj.getMinutes()
  if (mins < 10) {
    mins = '0' + mins
  }

  return hours + ':' + mins + amPm
}

const renderDateTime = (input) => {
  return renderDate(input) + ' ' + renderTime(input)
}

const BRACKETS = ['(', ')']

/**
 * Returns the progress from a project object
 *
 * @param done
 * @param total
 * @returns {string}  (x/y)
 */
const renderProgressNum = ({ tasksDone, tasksTotal }) => {
  return `${BRACKETS[0]}${tasksDone}/${tasksTotal}${BRACKETS[1]}`
}

/**
 * Render the progress from a project object
 *
 * @param done
 * @param total
 * @returns {string}  (77%)
 */
const renderProgressPercent = ({ tasksDone, tasksTotal }) => {
  if (!tasksTotal || tasksTotal === 0) return '0%'
  if (!tasksDone || tasksDone === 0) return '0%'
  const percNum = Math.floor((tasksDone / tasksTotal) * 100)
  return `${BRACKETS[0]}${percNum.toString()}%${BRACKETS[1]}`
}

const helpers = {
  timeDelay,
  renderDate: renderDate,
  renderTime: renderTime,
  renderDateTime: renderDateTime,
  renderProgressNum,
  renderProgressPercent
}

export default helpers
