<template>
  <div class=""
       :class="status">

    <form
      @submit.prevent="createProject">
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="name"
          @submit.prevent="createProject"
        />
        <button
          class="task__input__form__send"
          type="button"
          @click="createProject">
          CREATE
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import status from '../constants/status.js'

export default {
  name: 'ProjectCreate',
  data () {
    return {
      status: status.CLEAR,
      name: status.CLEAR
    }
  },
  computed: {
    isValid: function () {
      return this.name.length > 4
    },
    user: function () {
      return this.$store.getters['user/user']
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
        user: this.user.id,
        name: this.name
      }

      return this.$store.dispatch('projects/create', newProject)
        .then(project => {
          this.$emit(status.SUCCESS, project)
          this.$emit('close')
          this.status = status.SUCCESS
          this.name = status.CLEAR
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
