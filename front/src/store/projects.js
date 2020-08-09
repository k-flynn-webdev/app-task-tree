import Vue from 'vue'
import general from '../constants/general'
import ProjectService from '../services/ProjectService.js'

const allowedKeys = general.DEFAULT_PROJECT_HISTORY()

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
    history: (state) => state.history,
    /**
     * Returns all projects
     *
     * @param state
     * @returns {Array}
     */
    projects: (state) => state.projects,
    projectsNotDone: (state) => state.projects.filter(item => !item.doneDate),
    projectsDone: (state) => state.projects.filter(item => item.doneDate && item.doneDate.length > 5),
    /**
     * Returns a function to find a Project by ID
     *
     * @param {object}      state
     * @param {number}      id
     * @returns {function}
     */
    findProject: (state) => (id) => {
      return state.projects.find(item => item.id === id)
    }
  },
  mutations: {
    /**
     * Set the history of the last request
     *
     * @param state
     * @param input
     */
    setHistory: (state, input) => {
      if (!input) input = general.DEFAULT_PROJECT_HISTORY()

      Object.entries(input).forEach(([key, value]) => {
        if (allowedKeys[key] !== undefined) {
          Vue.set(state.history, key, value)
        }
      })
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
     * Updates a project item with an updated version
     *
     * @param {object}    state
     * @param {object}    input project
     * @returns {object}  new project
     */
    projectPatch: function (state, input) {
      for (let i = 0, max = state.projects.length; i < max; i++) {
        if (state.projects[i].id === input.id) {
          const newObj = Object.assign(state.projects[i], input)
          state.projects.splice(i, 1, newObj)
          return state.projects[i]
        }
      }
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

      state.projects.unshift(input)
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
     * Sets projects array
     *
     * @param {object}    state
     * @param {array}     input projects
     */
    setProjects: function (state, input) {
      if (!input) input = []
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
     * @param {object}    input = { id: projectId }
     * @returns {promise} all tasks
     */
    getProjectById: function (context, input) {
      return ProjectService.get(input)
        .then(res => {
          context.commit('projectReplace', res.data.data.project)
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
            context.commit('setProjects', res.data.data.projects)
            if (context.state.current.id < 0) {
              context.commit('projectCurrent', res.data.data.projects[0])
            }
          }
          return res.data.data.projects
        })
    }
    // for delayed/time consuming actions
  }
}
