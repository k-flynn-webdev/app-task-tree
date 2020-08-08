<template>
  <div class="relative">

    <Header :mode="mode" />

    <router-view />

  </div>
</template>

<script>
import modes from '../constants/modes'
import Header from '../components/Header'
import status from '@/constants/status'
import ProjectMixin from '../mixins/ProjectMixin'
import { get } from 'lodash-es'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Header
  },
  mixins: [ProjectMixin],
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    }
  },
  computed: {
    ...mapGetters({
      isValidUser: 'user/isValidUser'
    })
  },
  watch: {
    isValidUser: {
      handler: 'fetchList',
      immediate: true
    }
  },
  methods: {
    fetchList () {
      if (!this.isValidUser) return
      const params = this.createParams()
      return this.getProjects(params)
        .then(() => this.init())
        .catch(err => this.handleError(err, this.fetchList))
    },
    init () {
      const projectParamId = Number(get(this.$route, 'params.project'))
      if (!projectParamId) return

      const projectFound = this.$store.getters['projects/findProject'](projectParamId)
      const hasProject = !(!projectFound || projectFound.id < 0)

      if (hasProject) {
        this.$store.commit('projects/projectCurrent', projectFound)
        return
      }

      return this.$store.dispatch('projects/getProjectById',
        { id: projectParamId })
    },
    /**
     * Handle error response
     * @param {error}     err       error from response
     * @param {function}  cbRetry   function that the error arose from
     */
    handleError: function (err, cbRetry) {
      const errStatus = get(err, 'response.status')
      if (errStatus && errStatus === 401 &&
        this.$store.getters['user/isAnon'] &&
        cbRetry) {
        return cbRetry()
      }

      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)

      throw err
    }
  }
}
</script>
