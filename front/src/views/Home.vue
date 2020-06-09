<template>
  <div class="">

<!--    <div class="flex-row">-->
<!--      <User />-->
<!--      <p>option</p>-->
<!--    </div>-->

<!--    <div class="flex-row">-->
      <Project />
<!--    </div>-->

    <TaskInput />

<!--    <div class="task__timer"></div>-->

<!--    <TaskItems />-->

  </div>
</template>

<script>
// import User from '../components/User.vue'
import Project from '../components/Project.vue'
import TaskInput from '../components/TaskInput.vue'
// import TaskItems from '../components/TaskItems.vue'
// import MenuRowOpt from '../components/MenuRowOptSlide.vue'

export default {
  name: 'Home',
  components: {
    // User,
    Project,
    TaskInput
    // TaskItems
    // MenuRowOpt
  },

  data () {
    return {
      // testData: [false, false, false]
    }
  },

  methods: {
    // toggleRowData: function (row) {
    //   this.testData.splice(row, 1, !this.testData[row])
    // }
  }
}
</script>
