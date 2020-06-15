<template>
  <div class="project__info__mini">
    <p class="project__info__mini-name name lg text-bold">
      {{ project.name }}
    </p>
    <p class="project__info__mini-count lg text-bold">
      ({{ project.tasksTotal }}/{{ project.tasksDone }})
    </p>
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
