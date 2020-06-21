<template>

  <li class="list-item">

    <div class="task__project__list__item"
         :class="{ 'SELECT': selected,
         'EDIT': isEdit,
         'DELETE': isDelete ,
         'COMPLETE': data.isDone }">

      <div class="task__project__list__item-status text-left hide-sm-down"
        @click="onSelectProject">
        <icDone v-if="isDone" class="transition" />
        <icNone v-else-if="isWaiting" class="transition fill-waiting-status" />
        <icRound v-else class="xs transition" />
      </div>

      <div class="flex-auto no-overflow relative small-margin-xs-sm-md">

        <div class="task__project__list__item-content"
             @dblclick="onShowTasks"
             @click="onSelectProject">

          <p class="task__project__list__item-progress hide-xs">
            {{ progress }}
          </p>

          <p class="task__project__list__item-data">
            {{ data.name }}
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
import icDone from '../assets/icons/ic_tick'
import icNone from '../assets/icons/ic_none'
import icRound from '../assets/icons/ic_round'
import icOptions from '../assets/icons/ic_option'
import RowOption from './general/RowOption'
import StatusBar from './general/StatusBar'

export default {
  name: 'ProjectItem',
  components: {
    icNone,
    icDone,
    icRound,
    icOptions,
    RowOption,
    StatusBar
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
    progress: function () {
      return helpers.renderProgressNum(this.data)
    },
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
      return this.data.isDone
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
    onSelectProject: function () {
      this.$parent.$emit('CLOSE-OPT')
      this.$store.commit('projects/projectCurrent', this.data)
    },
    onShowTasks: function () {
      this.$emit('showTasks')
    },
    onModeEdit: function () {
      this.edit = this.data.name
      this.checkEdit(this.data.name)
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
      if (this.edit === this.data.name) return

      this.options.status = status.WAITING
      const updatedName = { id: this.data.id, name: this.edit }

      return this.$store.dispatch('projects/update', updatedName)
        .then(() => {
          this.handleSuccess()
          this.$nextTick(() => this.$refs.itemEdit.blur())
        })
        .catch(err => this.handleError(err))
    },
    confirmDelete: function () {
      if (this.options.status !== status.CLEAR) return

      this.options.status = status.WAITING

      return this.$store.dispatch('projects/remove', this.data)
        .then(() => this.handleSuccess())
        .catch(err => this.handleError(err))
    },
    checkEdit: function () {
      this.resetStatus()
      if (!this.edit || this.edit.length < 4) {
        this.options.isValidEdit = false
        return
      }

      this.options.isValidEdit = (this.edit !== this.data.name)
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
