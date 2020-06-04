import Vue from 'vue'
import ProjectService from '../services/ProjectService.js'

export default {
  namespaced: true,
  state: {
    projects: Array,
    current: Object
  },
  getters: {
    /**
     * Returns current project
     *
     * @param state
     * @returns {object}
     */
    current: (state) => state.current,
    /**
     * Returns all projects
     *
     * @param state
     * @returns {Array}
     */
    projects: (state) => state.projects,
    /**
     * Returns a function to get a project by ID
     *
     * @param {object}      state
     * @param {string}      id
     * @returns {function}
     */
    project: (state) => (id) => {
      return state.projects.find(item => item.id === id)
    }
  },
  mutations: {
    /**
     * Sets current project selected
     *
     * @param           state
     * @param {object}  input   project object
     * @returns {object}
     */
    projectCurrent: (state, input) => {
      Vue.set(state, 'current', input)
    },
    /**
     * Add a new project to the store
     *
     * @param {object}    state
     * @param {object}    input project obj
     * @returns {object}  new project
     */
    projectAdd: function (state, input) {
      state.projects.push(input)
      return input
    },
    /**
     * Replace a project item with an updated version
     *
     * @param {object}    state
     * @param {object}    input project
     * @returns {object}  new project
     */
    projectReplace: function (state, input) {
      for (let i = 0, max = state.projects.length; i < max; i++) {
        if (state.projects[i].id === input.id) {
          Vue.set(state.projects, i, input)
          return state.projects[i]
        }
      }
    },
    /**
     * Remove a project item
     *
     * @param {object}    state
     * @param {object}    input project
     * @returns {object}  project removed
     */
    projectRemove: function (state, input) {
      for (let i = 0, max = state.projects.length; i < max; i++) {
        if (state.projects[i].id === input.id) {
          Vue.delete(state.projects, i)
          return input
        }
      }
    }
  },
  actions: {
    /**
     * Creates a project and adds to store
     *
     * @param {object}    context
     * @param {object}    input project info
     * @returns {promise} new project
     */
    create: function (context, input) {
      return ProjectService.create(input)
        .then((res) => {
          context.commit('projectCurrent', res.data.project)
          return context.commit('projectAdd', res.data.project)
        })
    },
    /**
     * Update a project and store
     *
     * @param {object}    context
     * @param {object}    input project obj
     * @returns {promise} updated project
     */
    update: function (context, input) {
      return ProjectService.update(input)
        .then((res) => {
          return context.commit('projectReplace', res.data.project)
        })
    },
    /**
     * Remove a project and remove from store
     *
     * @param {object}    context
     * @param {object}    input project obj
     * @returns {promise} updated project
     */
    remove: function (context, input) {
      return ProjectService.remove(input.id)
        .then((res) => {
          return context.commit('projectRemove', input)
        })
    }
    // for delayed/time consuming actions
  }
}
