<template>
  <div class="project__input"
       :class="status">

    <button @click="display = !display">
      {{ buttonText }}
    </button>

    <form
      v-if="display"
      @submit.prevent="createProject">
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
            CREATE
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import status from '../constants/status.js'

const defaultInput = () => {
  return { text: status.CLEAR }
}

export default {
  name: 'ProjectInput',
  data () {
    return {
      display: false,
      status: status.CLEAR,
      project: defaultInput()
    }
  },
  computed: {
    buttonText: function () {
      if (this.display) return 'CLOSE'
      return 'NEW'
    },
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
          this.project.value = status.CLEAR
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
