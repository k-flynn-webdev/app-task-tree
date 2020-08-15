import Vue from 'vue'

let msgId = -1
let timerObj = null
const defaultToastTime = 4
const timerDelay = 1000

/**
 *
 * @return {Toast}
 * @constructor
 */
const DEFAULT_TOAST = () => {
  return {
    id: 0,
    title: '',
    message: '',
    isError: false,
    isTimed: false,
    time: -1
  }
}
/**
 * @typedef {object} Toast
 *
 * @property {number}   [id]          Unique ID
 * @property {string}   title         Title of toast
 * @property {string}   message       Message of toast
 * @property {boolean}  isError       Is error toast (affects colour)
 * @property {boolean}  isTimed       Is auto time closed toast
 * @property {number}   time          Time var before closing
 */

/**
 * Create a toast to alert the user
 *    options:
 *      isTimed: true     will add a delayed self close,
 *                        otherwise requires uer interaction
 *      isError: true     will add error visual class
 *
 * @param input
 * @returns {Toast}
 */
function createToast (input) {
  msgId += 1
  const title = input.title ? input.title : ''
  const messageAlt = input.data && input.data.message
    ? input.data.message : input.message
  const message = input.response && input.response.data
    ? input.response.data.message : messageAlt

  let isError = true
  if (input.isError !== undefined) {
    isError = input.isError
  }

  const isTimed = input.isTimed ? input.isTimed : false
  const time = () => {
    if (input.isTimed) {
      return defaultToastTime
    } else {
      return -1
    }
  }

  const newToast = DEFAULT_TOAST()
  newToast.id = msgId
  newToast.title = title
  newToast.message = message
  newToast.isError = isError
  newToast.isTimed = isTimed
  newToast.time = time()

  return newToast
}

function startTimerCheck (state) {
  if (timerObj) return
  timerObj = setTimeout(function () {
    updateTimerCheck(state)
  }, timerDelay)
}

function stopTimerCheck () {
  clearTimeout(timerObj)
  timerObj = null
}

function updateTimerCheck (state) {
  let allDone = true

  for (let i = state.toasts.length - 1; i >= 0; i--) {
    if (state.toasts[i].isTimed &&
      state.toasts[i].time >= 0) {
      state.toasts[i].time -= 1

      if (state.toasts[i].isTimed &&
        state.toasts[i].time < 0) {
        Vue.delete(state.toasts, i)
      }

      allDone = false
    }
  }

  if (allDone) {
    stopTimerCheck()
    return
  }

  timerObj = null
  startTimerCheck(state)
}

export default {
  namespaced: true,
  state: {
    /** All toasts */
    toasts: []
  },
  getters: {
    /**
     * Returns a function to get a toast by ID
     *
     * @param {object}      state
     * @param {string}      id
     * @returns {function}
     */
    getToastById: function (state) {
      return function (id) {
        return state.toasts.filter(item => item.id === id)
      }
    },
    /**
     * Returns a function to get a toast by message content
     *
     * @param {object}      state
     * @param {string}      content   term to search by
     * @returns {function}
     */
    getToastByContent: function (state) {
      return function (content) {
        const foundTitle = state.toasts.filter(item => item.title === content)
        const foundMessage = state.toasts.filter(item => item.message === content)

        if (foundTitle.length > 0) {
          return foundTitle
        }
        if (foundMessage.length > 0) {
          return foundMessage
        }
        return []
      }
    }
  },
  mutations: {
    /**
     * Add a new toast to the store
     *
     * @param {object}    state
     * @param {object}    input   toast properties
     * @returns {Toast}           new toast
     */
    addToast: function (state, input) {
      const newTask = createToast(input)

      // check for duplication
      const fndTitle = state.toasts.filter(item => item.title === newTask.title)
      const fndMsg = state.toasts.filter(item => item.message === newTask.message)
      if (fndTitle.length > 0 || fndMsg.length > 0) return

      state.toasts.push(newTask)

      if (newTask.isTimed >= 0) {
        startTimerCheck(state)
      }

      return newTask
    },
    /**
     * Remove a toast item
     *
     * @param {object}    state
     * @param {object}    input toast
     * @returns {object}  toast removed
     */
    removeToast: function (state, input) {
      for (let i = 0, max = state.toasts.length; i < max; i++) {
        if (state.toasts[i].id === input.id) {
          Vue.delete(state.toasts, i)
          return input
        }
      }
    },
    /**
     * Remove all toast items
     *
     * @param {object}    state
     * @returns {object}  toast removed
     */
    clearAllToasts: function (state) {
      Vue.set(state, 'toasts', [])
    }
  },
  actions: {
  }
}
