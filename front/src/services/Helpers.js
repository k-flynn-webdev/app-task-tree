const timeDelay = (action, delay) => {
  setTimeout(function () {
    action()
  }, delay)
}

const helpers = {
  timeDelay
}

export default helpers
