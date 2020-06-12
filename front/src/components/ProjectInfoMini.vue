<template>
  <div class="project__info__mini">
    <h3 class="project__info__mini-name">
      {{ project.name }}
    </h3>
    <h3 class="project__info__mini-count">
      ({{ project.tasksTotal }}/{{ project.tasksDone }})
    </h3>
  </div>
</template>

<script>
export default {
  name: 'ProjectInfoMini',
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    }
  }
}
</script>
