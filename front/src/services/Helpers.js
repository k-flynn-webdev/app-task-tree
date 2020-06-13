const timeDelay = (action, delay) => {
  return setTimeout(function () {
    action()
  }, delay)
}

const renderTime = (input) => {
  const dateObj = new Date(input)
  const dateString = dateObj.toLocaleDateString()
  const isPM = (dateObj.getHours() > 12)
  const hours = isPM ? dateObj.getHours() - 12 : dateObj.getHours()
  const amPm = isPM ? ' pm' : ' am'
  return dateString + ' ' + hours + ':' + dateObj.getMinutes() + amPm
}

const helpers = {
  timeDelay,
  renderTime
}

export default helpers
