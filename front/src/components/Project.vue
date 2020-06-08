<template>
  <div class="project">

    <div @click="showOpt = !showOpt">
      <p> {{ project.name }} </p>
    </div>

    <ProjectInput v-if="showOpt" @close="showOpt = false"/>
    <ProjectSelect v-if="showOpt" />

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
      showOpt: false
    }
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  mounted () {
    return this.getProjects()
  },
  methods: {
    getProjects: function () {
      const userParam = { user: this.user.id }
      return this.$store.dispatch('projects/getProjectsByUserId', userParam)
    }
  }
}
</script>
