<template>
  <div class="task__project__header__controls__input-bar">

    <form class="relative" @submit.prevent="submitInput">

      <StatusBar :status="status" />
      <input type="text"
             required
             ref="itemInput"
             v-model="input"
             minlength="4"
             :class="[ status, isDisabled? 'DISABLED': '' ]"
             :placeholder="placeHolder"
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
      status: status.CLEAR,
      isDisabled: false
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
    },
    placeHolder: function () {
      return this.mode === modes.TASKS ? 'Add a new task' : 'Add a new project'
    }
  },
  watch: {
    mode: function (val, pre) {
      this.status = status.CLEAR

      if (this.mode === modes.TASKS) {
        if (this.project.id < 0) {
          this.status = status.DISABLED
        }
      }
    }
  },
  mounted () {
    this.$root.$on('EDITING', this.disableInput)
  },
  beforeDestroy () {
    this.$root.$off('EDITING', this.disableInput)
  },
  methods: {
    reset: function () {
      this.input = status.CLEAR
      this.resetStatus()
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    /**
     * Disable user input bar
     *
     * @param input
     */
    disableInput: function (input) {
      this.isDisabled = input
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

          if (this.mode === modes.TASKS) {
            return this.getLatestProject()
          }

          this.$nextTick(() => this.$refs.itemInput.blur())
        })
        .catch(err => this.handleError(err))
    },
    getLatestProject: function () {
      return this.$store.dispatch('projects/getProjectById',
        { id: this.project.id })
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
