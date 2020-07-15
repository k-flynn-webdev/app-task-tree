<template>
  <div class="relative">

    <Header
      :mode="mode"
      :user="user"
      :valid-user="validUser" />

    <router-view />

<!--    <Card v-if="!validUser" class="max-30 intro-text">-->
<!--      <p class="intro-text__title"> Welcome to MiniTask </p>-->
<!--      <p class="intro-text__desc1"> A simple, fast, easy and shareable todo list. </p>-->
<!--      <p class="intro-text__desc2"> To get started, choose a account option from below. </p>-->

<!--      <div class="flex-row flex-between intro-text__buttons">-->
<!--        <router-link-->
<!--          class="text-bold color-fore"-->
<!--          to="/user/login">-->
<!--          Login-->
<!--        </router-link>-->
<!--        <router-link-->
<!--          class="text-bold color-fore"-->
<!--          to="/user/create">-->
<!--          Create-->
<!--        </router-link>-->
<!--        <button class="intro-text__anon"-->
<!--                @click="createAnonUser">-->
<!--          Try-->
<!--        </button>-->
<!--      </div>-->

<!--    </Card>-->

<!--    <Card v-if="!validUser" class="max-30 intro-text">-->
<!--      <p class="intro-text__title"> Features: </p>-->

<!--      <ul>-->
<!--        <li> No need for an account </li>-->
<!--        <li> A quick overview of progress </li>-->
<!--        <li> Share projects with others </li>-->
<!--        <li> Works on Mobile and Desktop </li>-->
<!--      </ul>-->

<!--    </Card>-->

<!--    <div v-else>-->
<!--      <ProjectsList v-if="isProjects" @showTasks="showTasks" />-->

<!--      <TasksList v-if="isTasks" />-->

<!--    </div>-->

  </div>
</template>

<script>
import Header from '../components/Header'
import modes from '../constants/modes'
// import Card from '../components/general/Card'
// import TasksList from '../components/TasksList'
// import ProjectsList from '../components/ProjectsList'

export default {
  name: 'Home',
  components: {
    Header
    // Card,
    // TasksList,
    // ProjectsList
  },
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    },
    validUser: function () {
      return !(this.user.id === null || this.user.id < 0)
    }
    // isProjects: function () {
    //   return this.mode === modes.PROJECTS
    // },
    // isTasks: function () {
    //   return this.mode === modes.TASKS
    // }
  },
  methods: {
    // showTasks: function () {
    //   this.mode = modes.TASKS
    // },

  }
}
</script>
