import Vue from 'vue'

let msgId = -1
let timerObj = null
const timerDelay = 1000

function createToast (input) {
  msgId += 1
  const title = input.title ? input.title : ''
  const message = input.message ? input.message : ''
  const isError = input.isError ? input.isError : true
  const isTimed = input.isTimed ? input.isTimed : 10

  return {
    id: msgId,
    title: title,
    message: message,
    isError: isError,
    isTimed: isTimed
  }
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
    if (state.toasts[i].isTimed >= 0) {
      state.toasts[i].isTimed -= 1

      if (state.toasts[i].isTimed < 0) {
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
    toasts: []
  },
  getters: {
    /**
     * Returns all toasts
     *
     * @param state
     * @returns {Array}
     */
    toasts: function (state) {
      return state.toasts
    },
    /**
     * Returns a function to get a toast by ID
     *
     * @param {object}      state
     * @param {string}      id
     * @returns {function}
     */
    toast: function (state) {
      return function (id) {
        return state.toasts.filter(item => item.id === id)
      }
    }
  },
  mutations: {
    /**
     * Add a new toast to the store
     *
     * @param {object}    state
     * @param {object}    input toast obj
     * @returns {object}  new toast
     */
    toastAdd: function (state, input) {
      const newTask = createToast(input)
      state.toasts.push(newTask)

      if (newTask.isTimed >= 0) {
        startTimerCheck(state)
      }

      return input
    },
    /**
     * Remove a toast item
     *
     * @param {object}    state
     * @param {object}    input toast
     * @returns {object}  toast removed
     */
    toastRemove: function (state, input) {
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
     * @param {object}    input toast
     * @returns {object}  toast removed
     */
    toastRemoveAll: function (state) {
      Vue.set(state, 'toasts', [])
    }
  },
  actions: {
  }
}
