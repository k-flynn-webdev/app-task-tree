<template>
  <div class=""
       :class="status">

    <form
      class="flex-row test2"
      @submit.prevent="deleteProject">

      <div class="flex-auto">

        <div v-if="status === ''">
          <span>Are you sure you want to delete </span>
          <strong>{{ project.name }}</strong>
          <span> ? </span>
        </div>

        <div v-if="status === 'SUCCESS'">
          <span>Project now deleted</span>
        </div>

      </div>

      <button
        class="task__input__form__send"
        type="button"
        @click="deleteProject">
        Delete
      </button>
      <button
        class="task__input__form__send"
        type="button"
        @click="$emit('close')">
        Cancel
      </button>

    </form>

  </div>
</template>

<script>
import status from '../constants/status.js'
import general from '../constants/general'
import helpers from '../services/Helpers'

export default {
  name: 'ProjectDelete',
  data () {
    return {
      status: status.CLEAR
    }
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    }
  },
  methods: {
    deleteProject: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      const newProject = {
        id: this.project.id
      }

      return this.$store.dispatch('projects/remove', newProject)
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
