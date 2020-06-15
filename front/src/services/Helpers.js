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
  renderTime,
  renderProgressNum,
  renderProgressPercent
}

export default helpers
