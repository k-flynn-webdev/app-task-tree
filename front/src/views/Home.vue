<template>
  <div class="relative">

    <div class="flex-row">

      <ProjectInfoMini />

      <div class="flex-auto" />

      <UserInfoMini />

    </div>

    <div class="flex-row">

      <ProjectTaskSwitch v-model="mode" />

      <InputBar class="flex-auto" :mode="mode" />

    </div>

    <ProjectsList v-if="isProjects" />

<!--    <Context />-->

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
import modes from '../constants/modes'
import InputBar from '../components/InputBar'
import UserInfoMini from '../components/UserInfoMini'
import ProjectsList from '../components/ProjectsList'
import ProjectInfoMini from '../components/ProjectInfoMini'
import ProjectTaskSwitch from '../components/ProjectTaskSwitch'
// import icAdd from '../assets/icons/ic_add'
// import Context from '../components/Context'
// import User from '../components/User.vue'
// import Project from '../components/Project'
// import ProjectSelect from '../components/ProjectSelect'
// import TaskInput from '../components/TaskInput'
// import TaskItems from '../components/TaskItems'

export default {
  name: 'Home',
  components: {
    InputBar,
    UserInfoMini,
    ProjectsList,
    ProjectInfoMini,
    ProjectTaskSwitch
    // Context
    // icAdd
    // User,
    // Project
    // ProjectSelect,
    // TaskInput,
    // TaskItems
  },
  data () {
    return {
      mode: modes.PROJECTS
    }
  },
  computed: {
    isProjects: function () {
      return this.mode === modes.PROJECTS
    },
    isTasks: function () {
      return this.mode === modes.TASKS
    }
  },
  methods: {
    updateMode: function (input) {
      this.mode = modes.filter(item => item === input)[0]
    }
  }
}
</script>
