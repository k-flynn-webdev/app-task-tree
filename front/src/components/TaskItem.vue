<template>

  <li class="list-item">

    <div class="task__project__list__item TASK"
        :class="{ 'EDIT': isEdit,
        'DELETE': isDelete ,
        'COMPLETE': data.isDone }">

      <RowStatus
        :class="{ 'SHADE': !selected && !isDone }"
        :is-waiting="isWaiting"
        :is-done="isDone"
        @click="onSelectTask" />

      <div class="flex-auto no-overflow relative small-margin-xs-sm-md">

        <div class="task__project__list__item-content"
             @dblclick="onSelectTask">

          <p class="task__project__list__item-data">
            {{ data.text }}
          </p>

          <p class="task__project__list__item-updated">
            <small class="hide-sm-down">{{ dayMonth }}</small>
            <small class="hide-md-down">/{{year }}</small>
            <small class="hide-lg-down"> {{ time }} </small>
          </p>

        </div>

        <form class="task__project__list__item__edit"
              @submit.prevent="confirmEdit">
          <input
              ref="itemEdit"
              class="task__project__list__item__edit-input"
              type="text"
              :class="options.status"
              v-model="edit"
              @input="checkEdit">
        </form>

        <StatusBar :status="options.status" />

        <div class="task__project__list__item-bg"></div>

      </div>

      <div class="task__project__list__item-option-bar-btn">
        <button aria-label="open options"
          title="open options"
          :class="{ 'DISABLED': options.show }"
          @click="openOptions">
          <icOptions class="icon-70" />
        </button>
      </div>

    </div>

    <RowOption
      :options="options"
      @confirm="onConfirm"
      @edit="onModeEdit"
      @delete="onModeDelete"
      @close="closeOptions"/>

  </li>

</template>

<script>
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
// import icNone from '../assets/icons/ic_none'
// import icDone from '../assets/icons/ic_tick'
// import icRound from '../assets/icons/ic_round'
import icOptions from '../assets/icons/ic_option'
import RowStatus from './general/RowStatus'
import RowOption from './general/RowOption'
import StatusBar from './general/StatusBar'

export default {
  name: 'TaskItem',
  components: {
    RowStatus,
    icOptions,
    RowOption,
    StatusBar
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
      options: {
        mode: status.CLEAR,
        status: status.CLEAR,
        show: false,
        showEdit: true,
        showDelete: true,
        showClose: true,
        isValidEdit: false
      },
      edit: status.CLEAR
    }
  },
  computed: {
    date: function () {
      return helpers.renderDate(this.data.updated)
    },
    dayMonth: function () {
      const tmp = this.date.split('/')
      tmp.splice(tmp.length - 1, 1)
      return tmp.join('/')
    },
    year: function () {
      const tmp = this.date.split('/')
      return tmp[tmp.length - 1]
    },
    time: function () {
      return helpers.renderTime(this.data.updated)
    },
    isEdit: function () {
      return this.options.mode === modes.EDIT
    },
    isDelete: function () {
      return this.options.mode === modes.DELETE
    },
    isWaiting: function () {
      return this.options.status === status.WAITING
    },
    isDone: function () {
      if (this.isWaiting) return false
      return this.data.isDone > 0
    },
    isError: function () {
      return this.options.status === status.ERROR
    }
  },
  mounted () {
    this.$parent.$on('CLOSE-OPT', this.closeImmediate)
  },
  beforeDestroy () {
    this.$parent.$off('CLOSE-OPT', this.closeImmediate)
  },
  methods: {
    onSelectTask: function () {
      if (this.options.status !== status.CLEAR) return
      if (this.options.mode !== status.CLEAR) return

      this.options.status = status.WAITING
      const taskUpdateBool =
        { id: this.data.id, isDone: !this.data.isDone }

      return this.$store.dispatch('tasks/update', taskUpdateBool)
        .then(() => {
          this.handleSuccess()
          return this.getLatestProject()
        })
        .catch(err => this.handleError(err))
    },
    onModeEdit: function () {
      this.edit = this.data.text
      this.checkEdit(this.data.text)
      this.options.mode = modes.EDIT
      this.options.showDelete = false
      this.options.showEdit = false
      this.$nextTick(() => this.$refs.itemEdit.focus())
      this.$root.$emit('EDITING', true)
    },
    onModeDelete: function () {
      this.options.mode = modes.DELETE
      this.options.showDelete = false
      this.options.showEdit = false
      this.options.isValidEdit = true
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
      if (this.options.status !== status.CLEAR) return
      if (this.edit === this.data.text) return

      this.options.status = status.WAITING
      const updatedText = { id: this.data.id, text: this.edit }

      return this.$store.dispatch('tasks/update', updatedText)
        .then(() => {
          this.handleSuccess()
          this.$nextTick(() => this.$refs.itemEdit.blur())
        })
        .catch(err => this.handleError(err))
    },
    confirmDelete: function () {
      if (this.options.status !== status.CLEAR) return

      this.options.status = status.WAITING

      return this.$store.dispatch('tasks/remove', this.data)
        .then(() => {
          this.handleSuccess()
          return this.getLatestProject()
        })
        .catch(err => this.handleError(err))
    },
    checkEdit: function () {
      this.resetStatus()
      if (!this.edit || this.edit.length < 4) {
        this.options.isValidEdit = false
        return
      }

      this.options.isValidEdit = (this.edit !== this.data.text)
    },
    openOptions: function () {
      this.resetMode()
      this.resetStatus()
      this.$parent.$emit('CLOSE-OPT')
      this.options.show = true
      this.options.showEdit = true
      this.options.showDelete = true
      this.options.showClose = true
    },
    closeOptions: function () {
      this.resetMode()
      this.options.show = false
    },
    closeImmediate: function () {
      this.resetMode()
      this.options.show = false
      this.options.showEdit = false
      this.options.showDelete = false
      this.options.showClose = false
    },
    resetStatus: function () {
      this.options.status = status.CLEAR
    },
    resetMode: function () {
      this.options.mode = status.CLEAR
      this.$root.$emit('EDITING', false)
    },
    getLatestProject: function () {
      return this.$store.dispatch('projects/getProjectById',
        { id: this.data.project })
    },
    handleSuccess: function () {
      this.options.status = status.SUCCESS

      helpers.timeDelay(() => {
        this.resetMode()
        this.closeOptions()
      }, general.DELAY_SUCCESS)

      helpers.timeDelay(() => {
        this.resetStatus()
      }, general.DELAY_SUCCESS + general.DELAY)
    },
    handleError: function (err) {
      this.options.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)

      helpers.timeDelay(() => {
        this.resetStatus()
      }, general.DELAY_ERROR)
    }
  }
}
</script>
