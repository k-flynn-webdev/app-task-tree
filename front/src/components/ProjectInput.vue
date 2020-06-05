<template>
  <div class="project__input"
       :class="status">
    <form @submit.prevent="createProject">
      <div class="project__input__form">
        <input
          type="text"
          required
          class="project__input__form text"
          v-model="project.value"
          @submit.prevent="createProject"
        />
        <div class="project__input__form__send">
          <button
            type="button"
            @click="createProject">
            send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import status from '../constants/status.js'

export default {
  name: 'ProjectInput',
  data () {
    return {
      status: status.CLEAR,
      project: {
        value: ''
      }
    }
  },
  computed: {
    isValid: function () {
      return this.project.value.length > 5
    },
    user: function () {
      const userTmp = this.$store.getters['user/current']
      if (userTmp && userTmp.id) return userTmp.id
      return -1
    }
  },
  methods: {
    resetStatus: function () {
      clearTimeout(this.statusTimer)

      const self = this
      this.statusTimer =
          setTimeout(function () {
            self.status = status.CLEAR
          }, 2 * 1000)
    },
    createProject: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      const newProject = {
        user: this.user,
        value: this.project.value
      }

      return this.$store.dispatch('projects/create', newProject)
        .then(project => {
          this.$emit(status.SUCCESS, project)
          this.status = status.SUCCESS
          this.resetStatus()
        })
        .catch(err => {
          this.$emit(status.ERROR, err)
          this.$store.commit('toasts/toastAdd', err)
          this.status = status.ERROR
          this.resetStatus()
        })
    }
  }
}
</script>
