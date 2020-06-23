<template>
  <div class="task__project__projects-list no-overflow">

     <transition-group name="list-anim" tag="ul">

      <ProjectItem
        v-for="item in projects"
        :key="item.id"
        :data="item"
        :selected="project.id === item.id"
        @show-tasks="showTasks"
      />

    </transition-group>

    <div v-if="projects.length < 1"
      class="text-center">
      <p class="hint"> Start by creating a new project to add tasks to </p>
    </div>

  </div>
</template>

<script>
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
    showTasks: function () {
      this.$emit('showTasks')
    }
  }
}
</script>
