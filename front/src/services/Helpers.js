const timeDelay = (action, delay) => {
  return setTimeout(function () {
    action()
  }, delay)
}

const helpers = {
  timeDelay
}

export default helpers
