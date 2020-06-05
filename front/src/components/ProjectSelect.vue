<template>
  <div class="project__select">

    <button @click="toggleDisplayProjects">
      {{ buttonText }}
    </button>

    <div v-if="display">
      <ul>
        <li
          v-for="project in projects"
          :key="project.id"
          @click="selectProject(project)">
          {{ project.name }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ProjectSelect',
  data: function () {
    return {
      display: false
    }
  },
  computed: {
    buttonText: function () {
      if (this.display) return 'HIDE'
      return 'SELECT'
    },
    projects: function () {
      return this.$store.getters['projects/projects']
    },
    currentProject: function () {
      const projectTmp = this.$store.getters['projects/current']
      if (projectTmp && projectTmp.id) return projectTmp
      return { name: 'Project', id: -1 }
    }
  },
  methods: {
    selectProject: function (project) {
      this.$store.commit('projects/projectCurrent', project)
    },
    toggleDisplayProjects: function () {
      this.display = !this.display
    }
  }
}
</script>
