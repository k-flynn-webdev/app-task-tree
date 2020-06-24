<template>

  <RowItem
    ref="projItem"
    v-model="input"
    class="HOVER"
    :class="{ 'SELECT': selected }"
    :data="data"
    :status="status"
    :selected="selected"
    :statusCheckBox="hasCheckBox"
    @reset="resetValue"
    @confirm="onConfirm"
    @click="onSelectProject"
    @dblclick="onShowTasks" />

</template>

<script>
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import RowItem from './general/RowItem'

export default {
  name: 'ProjectItem',
  components: {
    RowItem
  },
  props: {
    data: {
      type: Object,
      default: general.DEFAULT_PROJECT()
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
      hasCheckBox: false
    }
  },
  methods: {
    onSelectProject: function () {
      this.$store.commit('projects/projectCurrent', this.data)
    },
    onShowTasks: function () {
      this.$emit('show-tasks')
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
      if (this.input === this.data.name) return

      this.status = status.WAITING
      const updatedName = { id: this.data.id, name: this.input }

      return this.$store.dispatch('projects/update', updatedName)
        .then(() => this.$root.$emit('blur'))
        .then(() => this.handleSuccess())
        .catch(err => this.handleError(err))
    },
    confirmDelete: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      return this.$store.dispatch('projects/remove', this.data)
        .then(() => this.handleSuccess())
        .catch(err => this.handleError(err))
    },
    checkEdit: function () {
      this.resetStatus()
      if (!this.input || this.input.length < 4) {
        return false
      }
      return (this.input !== this.data.name)
    },
    resetValue: function () {
      this.input = this.data.name
    },
    resetStatus: function () {
      this.status = status.CLEAR
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
    handleError: function (err) {
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
