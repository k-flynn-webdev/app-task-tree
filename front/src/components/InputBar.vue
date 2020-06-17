<template>
  <form :class="status"
        @submit.prevent="submitInput">
    <div class="task__project__input-bar">

      <input type="text" v-model="input" @input="resetStatus">

      <button aria-label="submit"
              title="submite"
              class="no-margin-r text-right"
              :class="{ 'DISABLED': !isValid }"
              @click="submitInput">
        <icTick alt="submit" class="md" />
      </button>

    </div>
  </form>
</template>

<script>
import icTick from '../assets/icons/ic_tick'
import status from '../constants/status.js'
import modes from '../constants/modes.js'
import general from '../constants/general'
import helpers from '../services/Helpers'

export default {
  name: 'InputBar',
  components: {
    icTick
  },
  props: {
    mode: {
      type: String,
      default: status.CLEAR
    }
  },
  data () {
    return {
      input: status.CLEAR,
      status: status.CLEAR
    }
  },
  computed: {
    isValid: function () {
      return this.input.length >= 4
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    project: function () {
      return this.$store.getters['projects/current']
    }
  },
  watch: {
    mode: function (val, pre) {
      // this.reset()
    }
  },
  methods: {
    reset: function () {
      this.input = status.CLEAR
      this.resetStatus()
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    submitInput: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      let dispatchType = 'projects/create'
      let dispatchValue = {
        user: this.user.id,
        name: this.input
      }
      if (this.mode === modes.TASKS) {
        dispatchType = 'tasks/create'
        dispatchValue = {
          user: this.user.id,
          project: this.project.id,
          text: this.input
        }
      }

      return this.$store.dispatch(dispatchType, dispatchValue)
        .then(result => {
          helpers.timeDelay(() => {
            this.reset()
          }, general.DELAY_SUCCESS)
          this.input = status.CLEAR
          this.status = status.SUCCESS
          this.$emit(status.SUCCESS, result)
        })
        .catch(err => this.handleError(err))
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
