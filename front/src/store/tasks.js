import Vue from 'vue'
import TaskService from '../services/TaskService.js'
import general from '../constants/general'
import helpers from '../services/Helpers'

const allowedKeys = general.DEFAULT_TASK_HISTORY()

export default {
  namespaced: true,
  state: {
    /** Current selected Task */
    task: general.DEFAULT_TASK(-1),
    /** Task array */
    tasks: [], // todo: future freeze arrays of large size
    /** Last API request config */
    history: general.DEFAULT_TASK_HISTORY()
  },
  getters: {
    /**
     * Returns all finished tasks
     *
     * @param state
     * @returns {Project[]}
     */
    tasksDone: (state) => state.tasks.filter(item => item.doneDate && item.doneDate.length > 5),
    /**
     * Returns all unfinished tasks
     *
     * @param state
     * @returns {Project[]}
     */
    tasksNotDone: (state) => state.tasks.filter(item => !item.doneDate),
    /**
     * Returns a function to find a Task by ID
     *
     * @param {object}      state
     * @param {number}      id
     * @returns {function}
     */
    findTask: (state) => (id) => {
      return state.tasks.find(item => item.id === id)
    }
  },
  mutations: {
    /**
     * Set the API request config
     *
     * @param state
     * @param {TaskHistory} input
     */
    setHistory: (state, input) => {
      if (!input) input = general.DEFAULT_TASK_HISTORY()

      Object.entries(input).forEach(([key, value]) => {
        if (allowedKeys[key] !== undefined) {
          Vue.set(state.history, key, value)
        }
      })
    },
    /**
     * Set the current Task
     *
     * @param state
     * @param {Task}  input   task object
     */
    setTask: (state, input) => {
      Vue.set(state, 'task', input)
    },
    /**
     * Add a new task to the store
     *
     * @param {object}    state
     * @param {Task}      input task obj
     * @returns {Task}    new task
     */
    addTask: function (state, input) {
      state.tasks.unshift(input)
      return input
    },
    /**
     * Update a task item with an updated version
     *
     * @param {object}    state
     * @param {Task}      input task
     * @returns {Task}    new task
     */
    patchTask: function (state, input) {
      for (let i = 0, max = state.tasks.length; i < max; i++) {
        if (state.tasks[i].id === input.id) {
          const newObj = Object.assign(state.tasks[i], input)
          state.tasks.splice(i, 1, newObj)
          return state.tasks[i]
        }
      }
    },
    /**
     * Replace a task item with an updated version
     *
     * @param {object}    state
     * @param {Task}      input task
     * @returns {Task}    new task
     */
    replaceTask: function (state, input) {
      for (let i = 0, max = state.tasks.length; i < max; i++) {
        if (state.tasks[i].id === input.id) {
          state.tasks.splice(i, 1, input)
          return state.tasks[i]
        }
      }

      state.tasks.unshift(input)
    },
    /**
     * Remove a task item
     *
     * @param {object}    state
     * @param {Task}      input task
     * @returns {Task}    task removed
     */
    removeTask: function (state, input) {
      for (let i = 0, max = state.tasks.length; i < max; i++) {
        if (state.tasks[i].id === input.id) {
          state.tasks.splice(i, 1)
          return input
        }
      }
    },
    /**
     * Set tasks array
     *
     * @param {object}      state
     * @param {Task[]}      input tasks
     */
    setTasks: function (state, input) {
      if (!input) input = []
      Vue.set(state, 'tasks', input)
    }
  },
  actions: {
    /**
     * Creates a task item and adds to store
     *
     * @param {object}      context
     * @param {Task}        input task info
     * @returns {promise}   new task
     */
    create: function (context, input) {
      return TaskService.create(input)
        .then(res => {
          return context.commit('addTask', res.data.data.task)
        })
    },
    /**
     * Update a task item and store
     *
     * @param {object}      context
     * @param {Task}        input task obj
     * @returns {promise}   updated task
     */
    update: function (context, input) {
      return TaskService.update(input)
        .then(res => {
          let delayTime = 0
          if (input.isDone !== undefined) delayTime = general.DELAY_SUCCESS
          helpers.timeDelay(() => {
            context.commit('replaceTask', res.data.data.task)
          }, delayTime)
        })
    },
    /**
     * Remove a task item and remove from store
     *
     * @param {object}      context
     * @param {Task}        input task obj
     * @returns {promise}   removed task
     */
    remove: function (context, input) {
      return TaskService.remove(input)
        .then(() => {
          return context.commit('removeTask', input)
        })
    },
    /**
     * Get all task items related to a project ID
     *
     * @param {object}    context
     * @param {object}    input project id
     * @returns {promise} all tasks
     */
    getTasksByProjectId: function (context, input) {
      return TaskService.all(input)
        .then(res => {
          if (res.data.data.tasks.length > 0) {
            context.commit('setTasks', res.data.data.tasks)
          }
          return res.data.data.tasks
        })
    }
    // for delayed/time consuming actions
  }
}
