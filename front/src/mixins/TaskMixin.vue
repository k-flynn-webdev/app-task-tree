<script>
import { get } from 'lodash-es'
import columns from '../constants/columns'

export default {
  name: 'TaskMixin',
  methods: {
    /**
     * Creates a filter object for API requests
     *
     * @param {object}  config    extra params for API call // todo
     * @returns {object}
     */
    createParams: function (config = undefined) {
      const userOpts = this.$store.getters['user/options']

      return {
        showDone: !userOpts.tasks.showDone ? false : undefined,
        sortAsc: userOpts.sort.asc ? true : undefined,
        sortType: columns[userOpts.sort.type],
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
      const history = this.$store.getters['tasks/history']
      const isSame = Object.keys(history).filter(k => get(history, k) !== get(params, k)).length < 1
      if (isSame) return Promise.resolve([])

      // empty store if task changed ..
      if (history.project !== params.project) {
        this.$store.commit('tasks/taskSet', [])
      }

      // update store with last request
      this.$store.commit('tasks/setHistory', params)

      return this.$store.dispatch('tasks/getTasksByProjectId',
        params)
    }
  }
}
</script>
