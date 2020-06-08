<template>
  <div class="">

<!--    <button @click="toggleRowData(0)">show 0</button>-->
<!--    <button @click="toggleRowData(1)">show 1</button>-->
<!--    <button @click="toggleRowData(2)">show 2</button>-->

<!--    <MenuRowOpt :show="testData">-->
<!--      <p slot="0" :key="0"> testing 0</p>-->
<!--      <p slot="1" :key="1"> testing 1</p>-->
<!--      <p slot="2" :key="2"> testing 2</p>-->
<!--    </MenuRowOpt>-->

<!--    <div class="flex-row">-->
<!--      <User />-->
<!--      <p>option</p>-->
<!--    </div>-->

<!--    <div class="flex-row">-->
      <Project />
<!--    </div>-->

<!--    <TaskInput />-->

<!--    <div class="task__timer"></div>-->

<!--    <TaskItems />-->

  </div>
</template>

<script>
// import User from '../components/User.vue'
import Project from '../components/Project.vue'
// import TaskInput from '../components/TaskInput.vue'
// import TaskItems from '../components/TaskItems.vue'
// import MenuRowOpt from '../components/MenuRowOptSlide.vue'

export default {
  name: 'Home',
  components: {
    // User,
    Project
    // TaskInput,
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
