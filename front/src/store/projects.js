import Vue from 'vue'
import general from '../constants/general'
import ProjectService from '../services/ProjectService.js'

const allowedKeys = general.DEFAULT_PROJECT_HISTORY()

export default {
  namespaced: true,
  state: {
    /** Current selected Project */
    project: general.DEFAULT_PROJECT(),
    /** Project array */
    projects: [], // todo: future freeze arrays of large size
    /** Last API request config */
    history: general.DEFAULT_PROJECT_HISTORY()
  },
  getters: {
    /**
     * Returns all finished projects
     *
     * @param state
     * @returns {Project[]}
     */
    projectsDone: (state) => state.projects.filter(item => item.doneDate && item.doneDate.length > 5),
    /**
     * Returns all unfinished projects
     *
     * @param state
     * @returns {Project[]}
     */
    projectsNotDone: (state) => state.projects.filter(item => !item.doneDate),
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
     * Set the API request config
     *
     * @param state
     * @param {ProjectHistory} input
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
     * Set the current Project
     *
     * @param state
     * @param {Project}  input   project object
     */
    setProject: (state, input) => {
      Vue.set(state, 'project', input)
    },
    /**
     * Add a new project to the store
     *
     * @param {object}      state
     * @param {Project}     input project obj
     * @returns {Project}   new project
     */
    addProject: function (state, input) {
      state.projects.unshift(input)
      return input
    },
    /**
     * Updates a project item with an updated version
     *
     * @param {object}      state
     * @param {Project}     input project
     * @returns {Project}   new project
     */
    patchProject: function (state, input) {
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
     * @param {object}      state
     * @param {Project}     input project
     * @returns {Project}   new project
     */
    replaceProject: function (state, input) {
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
     * @param {Project}    input project
     * @returns {Project}  project removed
     */
    removeProject: function (state, input) {
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
     * @param {object}      state
     * @param {Project[]}   input projects
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
     * @param {object}      context
     * @param {Project}     input project info
     * @returns {promise}   new project
     */
    create: function (context, input) {
      return ProjectService.create(input)
        .then(res => {
          context.commit('addProject', res.data.data.project)
          context.commit('setProject', res.data.data.project)
          return res.data.data.project
        })
    },
    /**
     * Update a project and store
     *
     * @param {object}      context
     * @param {Project}     input project obj
     * @returns {promise}   updated project
     */
    update: function (context, input) {
      return ProjectService.update(input)
        .then(res => {
          context.commit('replaceProject', res.data.data.project)
          if (context.state.project.id !== input.id) return
          context.commit('setProject', res.data.data.project)
          return res.data.data.project
        })
    },
    /**
     * Remove a project and remove from store
     *  and reset the current project ..
     *
     * @param {object}      context
     * @param {Project}     input project obj
     * @returns {promise}   updated project
     */
    remove: function (context, input) {
      return ProjectService.remove(input)
        .then(() => {
          context.commit('removeProject', input)
          if (context.state.project.id !== input.id) return
          return context.commit('setProject', context.state.projects[0])
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
          context.commit('replaceProject', res.data.data.project)
          context.commit('setProject', res.data.data.project)
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
            if (context.state.project.id < 0) {
              context.commit('setProject', res.data.data.projects[0])
            }
          }
          return res.data.data.projects
        })
    }
    // for delayed/time consuming actions
  }
}
