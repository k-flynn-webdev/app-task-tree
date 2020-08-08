<script>
import { get } from 'lodash-es'
import columns from '../constants/columns'

export default {
  name: 'ProjectMixin',
  methods: {
    /**
     * Creates a filter object for API requests
     *
     * @param {object}  config    extra params for API call // todo
     * @returns {object}
     */
    createParams: function (config = undefined) {
      const user = this.$store.getters['user/user']
      const userOpts = this.$store.getters['user/options']

      return {
        user: user.id,
        showDone: !userOpts.projects.showDone ? false : undefined,
        sortAsc: userOpts.sort.asc ? true : undefined,
        sortType: columns[userOpts.sort.type],
        config
      }
    },
    /**
     * Update project store with results of API call to /projects
     *
     * @param {object}  params  API param config object
     * @returns {Promise<any>|Promise<void>}
     */
    getProjects: function (params) {
      const history = this.$store.getters['projects/history']
      const isSame = Object.keys(history).filter(k => get(history, k) !== get(params, k)).length < 1
      if (isSame) return Promise.resolve([])

      // empty store if user changed ..
      if (history.user !== this.user) {
        this.$store.commit('projects/projectSet', [])
      }

      // update store with last request
      this.$store.commit('projects/setHistory', params)

      return this.$store.dispatch('projects/getProjectsByUserId',
        params)
    }
  }
}
</script>
