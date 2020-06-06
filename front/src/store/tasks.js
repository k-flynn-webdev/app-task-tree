import Vue from 'vue'
import TaskService from '../services/TaskService.js'

export default {
  namespaced: true,
  state: {
    tasks: [],
    current: {}
  },
  getters: {
    /**
     * Returns current task
     *
     * @param state
     * @returns {object}
     */
    current: (state) => state.current,
    /**
     * Returns all tasks
     *
     * @param state
     * @returns {Array}
     */
    tasks: (state) => state.tasks,
    /**
     * Returns a function to get a task by ID
     *
     * @param {object}      state
     * @param {string}      id
     * @returns {function}
     */
    task: (state) => (id) => {
      return state.tasks.find(item => item.id === id)
    }
  },
  mutations: {
    /**
     * Sets current task selected
     *
     * @param           state
     * @param {object}  input   task object
     * @returns {object}
     */
    taskCurrent: (state, input) => {
      Vue.set(state, 'current', input)
    },
    /**
     * Add a new task to the store
     *
     * @param {object}    state
     * @param {object}    input task obj
     * @returns {object}  new task
     */
    taskAdd: function (state, input) {
      state.tasks.push(input)
      return input
    },
    /**
     * Replace a task item with an updated version
     *
     * @param {object}    state
     * @param {object}    input task
     * @returns {object}  new task
     */
    taskReplace: function (state, input) {
      for (let i = 0, max = state.tasks.length; i < max; i++) {
        if (state.tasks[i].id === input.id) {
          Vue.set(state.tasks, i, input)
          return state.tasks[i]
        }
      }
    },
    /**
     * Remove a task item
     *
     * @param {object}    state
     * @param {object}    input task
     * @returns {object}  task removed
     */
    taskRemove: function (state, input) {
      for (let i = 0, max = state.tasks.length; i < max; i++) {
        if (state.tasks[i].id === input.id) {
          Vue.delete(state.tasks, i)
          return input
        }
      }
    },
    /**
     * Sets all task items
     *
     * @param {object}    state
     * @param {array}     input tasks
     * @returns {array}  tasks added
     */
    taskSet: function (state, input) {
      Vue.set(state, 'tasks', input)
    }
  },
  actions: {
    /**
     * Creates a task item and adds to store
     *
     * @param {object}    context
     * @param {object}    input task info
     * @returns {promise} new task
     */
    create: function (context, input) {
      return TaskService.create(input)
        .then((res) => {
          context.commit('taskCurrent', res.data.data.task)
          return context.commit('taskAdd', res.data.data.task)
        })
    },
    /**
     * Update a task item and store
     *
     * @param {object}    context
     * @param {object}    input task obj
     * @returns {promise} updated task
     */
    update: function (context, input) {
      return TaskService.update(input)
        .then((res) => {
          return context.commit('taskReplace', res.data.data.task)
        })
    },
    /**
     * Remove a task item and remove from store
     *
     * @param {object}    context
     * @param {object}    input task obj
     * @returns {promise} removed task
     */
    remove: function (context, input) {
      return TaskService.remove(input.id)
        .then(() => {
          return context.commit('taskRemove', input)
        })
    },
    /**
     * Get all task items with of the user ID
     *
     * @param {object}    context
     * @param {object}    input user/project id
     * @returns {promise} all tasks
     */
    getTasksByUserOrProject: function (context, input) {
      return TaskService.all(input)
        .then(res => {
          return context.commit('taskSet', res.data.data.tasks)
        })
    }
    // for delayed/time consuming actions
  }
}
