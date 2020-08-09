<script>
import { get } from 'lodash-es'
import columns from '../constants/columns'
import { mapState } from 'vuex'

export default {
  name: 'ProjectMixin',
  computed: {
    ...mapState('user', {
      user: state => state.user,
      sortAsc: state => state.options.sort.asc,
      sortType: state => state.options.sort.type,
      showDone: state => state.options.projects.showDone
    })
  },
  methods: {
    /**
     * Creates a filter object for API requests
     *
     * @param {object}  config    extra params for API call // todo
     * @returns {object}
     */
    createParams: function (config = undefined) {
      return {
        user: this.user.id,
        showDone: !this.showDone ? false : undefined,
        sortAsc: this.sortAsc ? true : undefined,
        sortType: columns[this.sortType],
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
        this.$store.commit('projects/setProjects', [])
      }

      // update store with last request
      this.$store.commit('projects/setHistory', params)

      return this.$store.dispatch('projects/getProjectsByUserId',
        params)
    }
  }
}
</script>
