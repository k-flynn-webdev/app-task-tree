<template>
  <div class="task__project__header__info flex-row no-wrap">
    <p class="task__project__header__info-name name text-bold">
      {{ project.name }}
    </p>
    <p class="task__project__header__info-count text-bold">
      ({{ project.tasksTotal }}/{{ project.tasksDone }})
    </p>
  </div>
</template>

<script>
export default {
  name: 'ProjectInfoName',
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    }
  }
}
</script>
