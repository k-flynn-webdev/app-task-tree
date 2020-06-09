<template>
  <div class="">

<!--    <div class="flex-row">-->
<!--      <User />-->
<!--      <p>option</p>-->
<!--    </div>-->

<!--    <div class="flex-row">-->

    <ProjectSelect />

    <Project />
<!--    </div>-->

    <TaskInput />

<!--    <div class="task__timer"></div>-->

    <TaskItems />

  </div>
</template>

<script>
// import User from '../components/User.vue'
import Project from '../components/Project'
import ProjectSelect from '../components/ProjectSelect'
import TaskInput from '../components/TaskInput'
import TaskItems from '../components/TaskItems'

export default {
  name: 'Home',
  components: {
    // User,
    Project,
    ProjectSelect,
    TaskInput,
    TaskItems
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
