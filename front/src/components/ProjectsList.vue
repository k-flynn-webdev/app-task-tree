<template>
  <div class="task__project__projects-list no-overflow">

     <transition-group name="list-anim" tag="ul">

      <ProjectItem
        v-for="item in projects"
        :key="item.id"
        :data="item"
        :selected="project.id === item.id"
      />

    </transition-group>

    <div v-if="projects.length < 1"
      class="text-center">
      <p class="hint"> Start by creating a new project to add tasks to </p>
    </div>

  </div>
</template>

<script>
import status from '../constants/status.js'
import ProjectItem from '../components/ProjectItem'

export default {
  name: 'ProjectsList',
  components: {
    ProjectItem
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    projects: function () {
      return this.$store.getters['projects/projects']
    }
  },
  methods: {
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
