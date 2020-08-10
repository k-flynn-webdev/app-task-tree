<template>

  <RowItem
    ref="taskItem"
    v-model="input"
    class="HOVER-BG"
    :data="data"
    :status="status"
    :selected="selected"
    :statusCheckBox="hasCheckBox"
    @reset="resetValue"
    @confirm="onConfirm"
    @dblclick="onSelectTask"
    @status-click="onSelectTask" />

</template>

<script>
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import RowItem from './general/RowItem'
import { get } from 'lodash-es'

export default {
  name: 'TaskItem',
  components: {
    RowItem
  },
  props: {
    data: {
      type: Object,
      default: general.DEFAULT_TASK()
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: status.CLEAR,
      input: status.CLEAR,
      hasCheckBox: true
    }
  },
  methods: {
    onSelectTask: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING
      const taskUpdateBool =
        { id: this.data.id, isDone: !this.data.isDone }

      return this.$store.dispatch('tasks/update', taskUpdateBool)
        .then(() => {
          this.$store.commit('tasks/patchTask', taskUpdateBool)
          this.handleSuccess()
          return this.getLatestProject()
        })
        .catch(err => this.handleError(err, this.onSelectTask))
    },
    /**
     * Consume confirm event of row component
     *   with 'mode' type
     *
     * @param {string}  mode  types [EDIT, DELETE]
     */
    onConfirm: function (mode) {
      if (mode === modes.EDIT) return this.confirmEdit()
      if (mode === modes.DELETE) return this.confirmDelete()
    },
    confirmEdit: function () {
      if (this.status !== status.CLEAR) return
      if (this.input === this.data.text) return

      this.status = status.WAITING
      const updatedText = { id: this.data.id, text: this.input }

      return this.$store.dispatch('tasks/update', updatedText)
        .then(() => this.$root.$emit('blur'))
        .then(() => this.handleSuccess())
        .catch(err => this.handleError(err, this.confirmEdit))
    },
    confirmDelete: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      return this.$store.dispatch('tasks/remove', this.data)
        .then(() => {
          this.handleSuccess()
          return this.getLatestProject()
        })
        .catch(err => this.handleError(err, this.confirmDelete))
    },
    checkEdit: function () {
      this.resetStatus()
      if (!this.input || this.input.length < 4) {
        return false
      }
      return (this.input !== this.data.text)
    },
    resetValue: function () {
      this.input = this.data.text
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    getLatestProject: function () {
      return this.$store.dispatch('projects/getProjectById',
        { id: this.data.project })
    },
    handleSuccess: function () {
      this.status = status.SUCCESS

      helpers.timeDelay(() => {
        this.$root.$emit(status.CLOSE.toLowerCase(), -1)
      }, general.DELAY_SUCCESS)

      helpers.timeDelay(() => {
        this.resetStatus()
      }, general.DELAY_SUCCESS + general.DELAY)
    },
    /**
     * Handle error response
     * @param {error}     err       error from response
     * @param {function}  cbRetry   function that the error arose from
     */
    handleError: function (err, cbRetry) {
      const errStatus = get(err, 'response.status')
      if (errStatus && errStatus === 401 && this.$store.getters['user/isAnon']) {
        if (!cbRetry) return
        return cbRetry()
      }

      this.status = status.ERROR
      this.$root.$emit(modes.EDIT.toLowerCase(), false)

      this.$emit(status.ERROR.toLowerCase(), err)
      this.$store.commit('toasts/toastAdd', err)

      helpers.timeDelay(() => {
        this.resetStatus()
      }, general.DELAY_ERROR)
    }
  }
}
</script>
