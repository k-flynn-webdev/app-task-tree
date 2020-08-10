<script>
import { get } from 'lodash-es'
import columns from '../constants/columns'
import { mapState } from 'vuex'

export default {
  name: 'TaskMixin',
  computed: {
    ...mapState('user', {
      sortAsc: state => state.options.sort.asc,
      sortType: state => state.options.sort.type,
      showDone: state => state.options.tasks.showDone
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
        showDone: !this.showDone ? false : undefined,
        sortAsc: this.sortAsc ? true : undefined,
        sortType: columns[this.sortType],
        ...config
      }
    },
    /**
     * Update task store with results of API call to /tasks
     *
     * @param {object}  params  API param config object
     * @returns {Promise<any>|Promise<void>}
     */
    getTasks: function (params) {
      const history = this.$store.state.tasks.history
      const isSame = Object.keys(history).filter(k => get(history, k) !== get(params, k)).length < 1
      if (isSame) return Promise.resolve([])

      // empty store if task changed ..
      if (history.project !== params.project) {
        this.$store.commit('tasks/setTasks', [])
      }

      // update store with last request
      this.$store.commit('tasks/setHistory', params)

      return this.$store.dispatch('tasks/getTasksByProjectId',
        params)
    }
  }
}
</script>
