<template>
  <div class=""
       :class="status">

    <form
      @submit.prevent="renameProject">
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="name"
          @submit.prevent="renameProject"
        />
        <button
          class="task__input__form__send"
          type="button"
          :class="{ 'DISABLED': isDisabled }"
          @click="renameProject">
          Update
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import status from '../constants/status.js'
import general from '../constants/general'
import helpers from '../services/Helpers'

export default {
  name: 'ProjectRename',
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
    isDifferent () {
      return this.name !== this.project.name
    },
    isDisabled () {
      return !(this.isValid && this.isDifferent)
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    project: function () {
      return this.$store.getters['projects/current']
    }
  },
  mounted () {
    this.name = this.project.name
  },
  methods: {
    renameProject: function () {
      if (!this.isValid) return
      if (this.name === this.project.name) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      const newProject = {
        name: this.name,
        id: this.project.id
      }

      return this.$store.dispatch('projects/update', newProject)
        .then(project => {
          this.$emit(status.SUCCESS, project)
          this.status = status.SUCCESS

          helpers.timeDelay(() => {
            this.name = status.CLEAR
            this.$emit('close')
            this.status = status.CLEAR
          }, general.DELAY_SUCCESS)
        })
        .catch(err => {
          this.$store.commit('toasts/toastAdd', err)
          this.$emit(status.ERROR, err)
          this.status = status.ERROR

          helpers.timeDelay(() => {
            this.status = status.CLEAR
          }, general.DELAY_ERROR)
        })
    }
  }
}
</script>
