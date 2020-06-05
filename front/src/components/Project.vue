<template>
  <div class="project">
    <p> {{ currentProject.name }} </p>

    <button @click="toggleDisplayCreate">/</button>

    <ProjectInput v-if="displayCreate" />

  </div>
</template>

<script>
import ProjectInput from './ProjectInput'
import status from '../constants/status.js'

export default {
  name: 'Project',
  data () {
    return {
      status: status.CLEAR,
      displayCreate: false
    }
  },
  computed: {
    currentProject: function () {
      const projectTmp = this.$store.getters['projects/current']
      if (projectTmp && projectTmp.id) return projectTmp
      return { name: 'Project', id: -1 }
    }
  },
  components: {
    ProjectInput
  },
  methods: {
    toggleDisplayCreate: function () {
      this.displayCreate = !this.displayCreate
    }
  }
}
</script>
