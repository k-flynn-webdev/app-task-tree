<template>
  <div class="task__project__header__controls__input-bar">

    <form class="relative" @submit.prevent="submitInput">

      <StatusBar :status="status" />
      <input required
             type="text"
             minlength="4"
             ref="itemInput"
             v-model="input"
             :tabindex="[ allowInput? 0: -1 ]"
             :class="[ status, allowInput? '': 'DISABLED' ]"
             :placeholder="placeHolder"
             @input="resetStatus">

    </form>

    <button aria-label="submit"
            title="submit"
            class="no-margin-x text-right"
            :tabindex="[ allowInput? 0: -1 ]"
            :class="[ status, !isValid? 'DISABLED' : '', allowInput? '': 'DISABLED' ]"
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
import { get } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'InputBar',
  components: {
    icTick,
    StatusBar
  },
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    },
    isEnabled: {
      type: Boolean,
      default: true
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
    ...mapState('user', {
      userId: state => state.user.id
    }),
    ...mapState('projects', ['project']),
    allowInput: function () {
      if (this.mode === modes.CLEAR) return false
      return (!this.isDisabled && this.isEnabled)
    },
    isValid: function () {
      return this.input.length >= 4
    },
    placeHolder: function () {
      return this.mode === modes.TASKS ? 'Add a new task' : 'Add a new project'
    }
  },
  watch: {
    mode: function (val, pre) {
      this.status = status.CLEAR

      if (val === modes.TASKS) {
        if (this.project.id < 0) {
          this.status = status.DISABLED
        }
      }
    }
  },
  mounted () {
    this.$root.$on(status.EDIT.toLowerCase(), this.disableInput)
  },
  beforeDestroy () {
    this.$root.$off(status.EDIT.toLowerCase(), this.disableInput)
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
      if (!this.allowInput) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      let dispatchType = 'projects/create'
      let dispatchValue = {
        user: this.userId,
        name: this.input
      }
      if (this.mode === modes.TASKS) {
        dispatchType = 'tasks/create'
        dispatchValue = {
          user: this.userId,
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

          this.$nextTick(() => this.$refs.itemInput.blur())

          if (this.mode === modes.TASKS) {
            return this.getLatestProject()
          }
        })
        .catch(err => this.handleError(err, this.submitInput))
    },
    getLatestProject: function () {
      return this.$store.dispatch('projects/getProjectById',
        { id: this.project.id })
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
      this.$store.commit('toasts/addToast', err)

      throw err
    }
  }
}
</script>
