<template>
  <div class="project__select">

    <button @click="toggleProjects">
      {{ buttonText }}
    </button>

    <div v-if="showList">
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
      showList: false
    }
  },
  computed: {
    buttonText: function () {
      if (this.showList) return 'HIDE'
      return 'SELECT'
    },
    projects: function () {
      return this.$store.getters['projects/projects']
    },
    currentProject: function () {
      return this.$store.getters['projects/current']
    }
  },
  methods: {
    selectProject: function (project) {
      this.$store.commit('projects/projectCurrent', project)
    },
    toggleProjects: function () {
      this.showList = !this.showList
    }
  }
}
</script>
