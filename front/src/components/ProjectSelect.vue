<template>

    <div class="flex-row no-wrap overflow-auto-x">

      <div
        v-for="project in projects"
        :key="project.id"
        class="project-name"
        :class="{ 'SELECT' : project.id === currentProject.id }"
        @click="selectProject(project)">

        <p> {{ project.name }} </p>

      </div>

    </div>

</template>

<script>
import helpers from '../services/Helpers.js'
import general from '../constants/general.js'

export default {
  name: 'ProjectSelect',
  computed: {
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
      this.$root.$emit('PROJECT-CHANGE')
      helpers.timeDelay(() => {
        this.$emit('close')
      }, general.DELAY_SHORT)
    }
  }
}
</script>
