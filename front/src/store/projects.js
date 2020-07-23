import Vue from 'vue'
import general from '../constants/general'
import ProjectService from '../services/ProjectService.js'

export default {
  namespaced: true,
  state: {
    projects: [],
    current: general.DEFAULT_PROJECT(),
    history: general.DEFAULT_PROJECT_HISTORY()
  },
  getters: {
    /**
     * Returns current project
     *
     * @param state
     * @returns {object}
     */
    current: (state) => state.current,
    projectHistory: (state) => state.history,
    /**
     * Returns all projects
     *
     * @param state
     * @returns {Array}
     */
    projects: (state) => state.projects,
    projectsDone: (state) => state.projects.filter(item => item.isDone),
    projectsNotDone: (state) => state.projects.filter(item => !item.isDone),
    /**
     * Returns a function to find a Project by ID
     *
     * @param {object}      state
     * @param {string}      id
     * @returns {function}
     */
    findProject: (state) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  },
  mutations: {
    projectHistory: (state, input) => {
      if (input.user !== undefined) {
        state.history.user = input.user
      }
      if (input.showDone !== undefined) {
        state.history.showDone = input.showDone
      }
    },
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
      state.projects.unshift(input)
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
          state.projects.splice(i, 1, input)
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
          state.projects.splice(i, 1)
          return input
        }
      }
    },
    /**
     * Sets all project items
     *
     * @param {object}    state
     * @param {array}     input projects
     */
    projectSet: function (state, input) {
      Vue.set(state, 'projects', input)
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
        .then(res => {
          context.commit('projectAdd', res.data.data.project)
          context.commit('projectCurrent', res.data.data.project)
          return res.data.data.project
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
        .then(res => {
          context.commit('projectReplace', res.data.data.project)
          if (context.getters.current.id !== input.id) return
          context.commit('projectCurrent', res.data.data.project)
          return res.data.data.project
        })
    },
    /**
     * Remove a project and remove from store
     *  and reset the current project ..
     *
     * @param {object}    context
     * @param {object}    input project obj
     * @returns {promise} updated project
     */
    remove: function (context, input) {
      return ProjectService.remove(input)
        .then(() => {
          context.commit('projectRemove', input)
          if (context.getters.current.id !== input.id) return
          return context.commit('projectCurrent', context.getters.projects[0])
        })
    },
    /**
     * Get a project by the an ID and
     *    update the store data
     *
     * @param {object}    context
     * @param {object}    input params
     * @returns {promise} all tasks
     */
    getProjectById: function (context, input) {
      return ProjectService.get(input)
        .then(res => {
          context.commit('projectReplace', res.data.data.project)
          if (context.getters.current.id !== input.id) return
          context.commit('projectCurrent', res.data.data.project)
          return res.data.data.project
        })
    },
    /**
     * Get all projects created by the user ID
     *      if no projects, will create a basic
     *      anon project via api and return
     *
     * @param {object}    context
     * @param {object}    input params
     * @returns {promise} all tasks
     */
    getProjectsByUserId: function (context, input) {
      return ProjectService.all(input)
        .then(res => {
          if (res.data.data.projects.length > 0) {
            context.commit('projectHistory', {
              user: res.data.data.projects[0].user
            })
            context.commit('projectSet', res.data.data.projects)
          }
          return res
        })
    }
    // for delayed/time consuming actions
  }
}
