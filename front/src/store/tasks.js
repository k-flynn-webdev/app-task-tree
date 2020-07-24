import Vue from 'vue'
import TaskService from '../services/TaskService.js'
import general from '../constants/general'

export default {
  namespaced: true,
  state: {
    tasks: [],
    history: general.DEFAULT_TASK_HISTORY()
  },
  getters: {
    taskHistory: (state) => state.history,
    tasksDone: (state) => state.tasks.filter(item => item.isDone),
    tasksNotDone: (state) => state.tasks.filter(item => !item.isDone),
    /**
     * Returns all tasks
     *
     * @param state
     * @returns {Array}
     */
    tasks: (state) => state.tasks, // todo: future freeze arrays of large size
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
    taskHistory: (state, input) => {
      if (input.project !== undefined) {
        state.history.project = input.project
      }
      if (input.showDone !== undefined) {
        state.history.showDone = input.showDone
      }
    },
    /**
     * Add a new task to the store
     *
     * @param {object}    state
     * @param {object}    input task obj
     * @returns {object}  new task
     */
    taskAdd: function (state, input) {
      state.tasks.unshift(input)
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
          state.tasks.splice(i, 1, input)
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
          state.tasks.splice(i, 1)
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
        .then(res => {
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
        .then(res => {
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
      return TaskService.remove(input)
        .then(() => {
          return context.commit('taskRemove', input)
        })
    },
    /**
     * Get all task items related to a project ID
     *
     * @param {object}    context
     * @param {object}    input project id
     * @returns {promise} all tasks
     */
    getTasksByUserOrProject: function (context, input) {
      return TaskService.all(input)
        .then(res => {
          context.commit('taskSet', res.data.data.tasks)
          if (res.data.data.tasks) {
            context.commit('taskHistory', {
              project: res.data.data.tasks[0].project
            })
          }
          return res.data.data.tasks
        })
    }
    // for delayed/time consuming actions
  }
}
