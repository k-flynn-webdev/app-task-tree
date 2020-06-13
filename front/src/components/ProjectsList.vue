<template>
  <div class="task__project__projects-list">

    <ProjectItem
      v-for="item in projects"
      :class="{ 'SELECTED': project.id === item.id }"
      :key="item.id"
      :data="item"
    />

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
