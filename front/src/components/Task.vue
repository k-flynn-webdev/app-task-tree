<template>
    <div class="task__items__item"
         :class="status">
      <p
        v-if="!isEdit"
        class="task__items__item-text">
        {{ taskData.text }}
      </p>

      <input
        v-if="isEdit"
        type="text"
        required
        class="task__items__item-input"
        v-model="text"
        @submit.prevent="updateTask"
      />

      <button
        v-if="isEdit"
        class="task__items__item-confirm"
        :class="isDisabled"
        @click="updateTask">
        Update
      </button>

      <button
        v-if="showOpt && !isEdit"
        class="task__items__item-delete"
        @click="isEdit = true">
        Edit
      </button>

      <button
        v-if="showOpt"
        class="task__items__item-delete"
        @click="deleteTask">
        Del
      </button>

      <button
        class="task__items__item-opt"
        @click="optToggle">
        {{ optBtnText }}
      </button>

    </div>
</template>

<script>
import status from '../constants/status.js'

const defaultTask = () => {
  return {
    id: null,
    text: status.CLEAR,
    project: null,
    user: null
  }
}

export default {
  name: 'Task',
  data () {
    return {
      showOpt: false,
      isEdit: false,
      text: status.CLEAR,
      status: status.CLEAR
    }
  },
  props: {
    taskData: {
      type: Object,
      default: defaultTask()
    }
  },
  computed: {
    optBtnText: function () {
      if (this.showOpt) return 'Cancel'
      return 'Show'
    },
    isDisabled: function () {
      if (this.text === this.taskData.text) return status.DISABLED
      return status.CLEAR
    }
  },
  methods: {
    optToggle: function () {
      this.isEdit = false
      this.showOpt = !this.showOpt
      this.text = this.taskData.text
    },
    updateTask: function () {
      if (this.status !== status.CLEAR) return
      if (this.text === this.taskData.text) return

      this.status = status.WAITING

      const newTask = { id: this.taskData.id, text: this.text }

      return this.$store.dispatch('tasks/update', newTask)
        .then(() => {
          this.isEdit = false
          this.showOpt = false
          this.status = status.CLEAR
        })
        .catch(err => this.handleError(err))
    },
    deleteTask: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      return this.$store.dispatch('tasks/remove', this.taskData)
        .then(() => {
          this.status = status.CLEAR
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
