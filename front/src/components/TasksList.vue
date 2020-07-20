<template>
  <div class="task__project__tasks-list no-overflow">

     <transition-group name="list-anim" tag="ul">

      <TaskItem
        v-for="item in tasks"
        :key="item.id"
        :data="item"
      />

    </transition-group>

    <Card v-if="tasks.length < 1" class="text-center">
      <p v-if="project.id >= 0"
         class="hint"> Add a new task
      </p>
      <p v-else class="hint">
        First you need to create a project to add tasks to
      </p>
    </Card>

  </div>
</template>

<script>
import general from '../constants/general'
import status from '../constants/status.js'
import Card from '../components/general/Card'
import TaskItem from '../components/TaskItem'

export default {
  name: 'TasksList',
  components: {
    Card,
    TaskItem
  },
  props: {
    project: {
      type: Object,
      default: general.DEFAULT_PROJECT()
    }
  },
  computed: {
    ready: function () {
      return this.$store.getters.ready
    },
    task: function () {
      return this.$store.getters['tasks/current']
    },
    tasks: function () {
      return this.$store.getters['tasks/tasks']
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.getTasksOfProject()
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getTasksOfProject()
  },
  methods: {
    getTasksOfProject: function () {
      return this.$store.dispatch('tasks/getTasksByUserOrProject',
        { project: this.project.id })
        .then(() => this.setProjectName())
        .catch(err => this.handleError(err))
    },
    setProjectName: function () {
      const projectStore = this.$store.getters['projects/current']
      if (projectStore.id !== this.project.id) {
        const projectFound =
          this.$store.getters['projects/findProject'](this.project.id)
        this.$store.commit('projects/projectCurrent', projectFound)
      }
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
