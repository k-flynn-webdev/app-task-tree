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

const renderProgressNum = (done, total) => {
  return `(${done}/${total})`
}

const renderProgressPercent = (done, total) => {
  if (!total || total === 0) return '0%'
  if (!done || done === 0) return '0%'
  return Math.floor((done / total) * 100).toString() + '%'
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
