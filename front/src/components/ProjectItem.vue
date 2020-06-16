<template>

  <div :class="status">
    <div class="task__project__projects-list__item"
      @click="onSelectProject">

      <div class="task__project__projects-list__item-status text-left">
        <icTick v-if="data.isDone" class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
        <icRound v-else class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
      </div>

      <div class="task__project__projects-list__item-content flex-row"
        :class="{ 'SELECT': selected }">

        <p class="task__project__projects-list__item-progress text-left">
          {{ progress }}
        </p>

        <p class="task__project__projects-list__item-name flex-auto">
          {{ data.name }}
        </p>

        <p class="task__project__projects-list__item-updated text-right">
          {{ date }}
        </p>

      </div>

      <div class="task__project__projects-list__item-options text-right">
        <button class="no-margin"
          aria-label="open options"
          :class="{ 'DISABLED': showOpts }"
          @click="openOptions">
          <icOptions class="sm" />
        </button>
      </div>

    </div>

    <transition name="drop">
      <div v-if="showOpts"
           class="task__project__projects-list__expanded">

        <button aria-label="edit project name"
                class="option"
                @click="closeOptions">
          <icEdit />
        </button>

        <button aria-label="delete project"
                class="option"
                @click="closeOptions">
          <icDelete class="fill-warning" />
        </button>

        <button aria-label="close options"
                class="no-margin-r"
                @click="closeOptions">
          <icRight />
        </button>

      </div>
    </transition>

  </div>

</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import icEdit from '../assets/icons/ic_edit'
import icTick from '../assets/icons/ic_tick'
import icRound from '../assets/icons/ic_round'
import icRight from '../assets/icons/ic_right'
import icDelete from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

export default {
  name: 'ProjectItem',
  components: {
    icEdit,
    icTick,
    icRound,
    icRight,
    icDelete,
    icOptions
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
      showOpts: false
    }
  },
  computed: {
    progress: function () {
      return helpers.renderProgressNum(this.data.tasksDone, this.data.tasksTotal)
    },
    date: function () {
      return helpers.renderTime(this.data.updated)
    }
  },
  mounted () {
    this.$parent.$on('CLOSE-OPT', this.closeOptions)
  },
  methods: {
    onSelectProject: function () {
      this.$store.commit('projects/projectCurrent', this.data)
    },
    openOptions: function () {
      this.$parent.$emit('CLOSE-OPT')
      this.showOpts = true
    },
    closeOptions: function () {
      this.showOpts = false
    }
  }
}
</script>
