<template>
    <div class="task__project__input-bar">

      <form class="relative flex-auto"
            @submit.prevent="submitInput">

        <StatusBar :status="status" />
        <input type="text"
               v-model="input"
               :class="status"
               @input="resetStatus">

      </form>

      <button aria-label="submit"
              title="submit"
              class="no-margin-x text-right"
              :class="[ status, !isValid? 'DISABLED' : '' ]"
              @click="submitInput">
        <icTick alt="submit" class="md" />
      </button>

    </div>
</template>

<script>
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import StatusBar from './general/StatusBar'
import icTick from '../assets/icons/ic_tick'

export default {
  name: 'InputBar',
  components: {
    icTick,
    StatusBar
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
          this.input = status.CLEAR
          this.status = status.SUCCESS
          this.$emit(status.SUCCESS, result)

          helpers.timeDelay(() => {
            this.reset()
          }, general.DELAY_SUCCESS)
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
