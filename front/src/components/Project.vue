<template>
  <div class="project">

    <div @click="displayProjects = !displayProjects">
      <p> {{ currentProject.name }} </p>
    </div>

    <ProjectInput v-if="displayProjects" />
    <ProjectSelect v-if="displayProjects" />

  </div>
</template>

<script>
import ProjectInput from './ProjectInput'
import ProjectSelect from './ProjectSelect'

export default {
  name: 'Project',
  components: {
    ProjectInput,
    ProjectSelect
  },
  data () {
    return {
      displayProjects: false
    }
  },
  computed: {
    currentProject: function () {
      return this.$store.getters['projects/current']
    }
  }
}
</script>
