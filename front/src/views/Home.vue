<template>
  <div class="relative">

    <Context />

<!--    <div class="flex-row">-->
<!--    <User />-->
<!--      <p>option</p>-->
<!--    </div>-->

<!--    <div class="flex-row">-->

<!--    <ProjectSelect />-->
<!--    <div class="">-->

<!--      <div class="absolute offscreen-page"-->
<!--           :class="{ 'show' : showAllProjects }">-->

<!--        <div class="text-right">-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--          <p>All projects here</p>-->
<!--        </div>-->

<!--      </div>-->

<!--      <Project @showAll="updateShowAllProjects" />-->

<!--    </div>-->

<!--    </div>-->

<!--    <TaskInput />-->

<!--    <div class="task__timer"></div>-->

<!--    <TaskItems />-->

  </div>
</template>

<script>
import Context from '../components/Context'
// import User from '../components/User.vue'
// import Project from '../components/Project'
// import ProjectSelect from '../components/ProjectSelect'
// import TaskInput from '../components/TaskInput'
// import TaskItems from '../components/TaskItems'

export default {
  name: 'Home',
  components: {
    Context
    // User,
    // Project
    // ProjectSelect,
    // TaskInput,
    // TaskItems
  },
  data () {
    return {
      showAllProjects: false
    }
  },
  methods: {
    updateShowAllProjects: function (value) {
      this.showAllProjects = value
    }
  }
}
</script>
