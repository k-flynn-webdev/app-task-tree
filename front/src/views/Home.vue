<template>
  <div class="relative">

    <div class="task__project__header">

      <ProjectInfoName />

    </div>

    <div class="task__project__header__controls">

      <div class="flex-row">
        <ProjectTaskSwitch v-model="mode" :is-enabled="validUser" />

        <UserInfoMini :is-enabled="validUser" />
      </div>

      <InputBar :mode="mode" :is-enabled="validUser" />

    </div>

    <Card v-if="!validUser" class="max-30 intro-text">
      <p class="intro-text__title"> Welcome to MiniTask </p>
      <p class="intro-text__desc"> A simple fast and easy shareable todo list. </p>
      <p class="intro-text__desc-2"> To get started, choose an account option from below. </p>

      <div class="flex-row flex-between intro-text__buttons">
        <router-link
          class="text-bold color-fore"
          to="/user/login">
          Login
        </router-link>
        <router-link
          class="text-bold color-fore"
          to="/user/create">
          Create
        </router-link>
        <button class="intro-text__anon"
                @click="createAnonUser">
          Try
        </button>
      </div>

    </Card>

    <div v-else>
      <ProjectsList v-if="isProjects" @showTasks="showTasks" />

      <TasksList v-if="isTasks" />

    </div>

  </div>
</template>

<script>
import modes from '../constants/modes'
import Card from '../components/general/Card'
import InputBar from '../components/InputBar'
import UserInfoMini from '../components/UserInfoMini'
import TasksList from '../components/TasksList'
import ProjectsList from '../components/ProjectsList'
import ProjectInfoName from '../components/ProjectInfoName'
import ProjectTaskSwitch from '../components/ProjectTaskSwitch'

export default {
  name: 'Home',
  components: {
    Card,
    InputBar,
    UserInfoMini,
    ProjectsList,
    ProjectInfoName,
    ProjectTaskSwitch,
    TasksList
  },
  data () {
    return {
      mode: modes.PROJECTS,
      test: {
        isWaiting: false,
        isDone: false
      }
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    },
    validUser: function () {
      return !(this.user.id === null || this.user.id < 0)
    },
    isProjects: function () {
      return this.mode === modes.PROJECTS
    },
    isTasks: function () {
      return this.mode === modes.TASKS
    }
  },
  methods: {
    showTasks: function () {
      this.mode = modes.TASKS
    },
    createAnonUser: function () {
      const userTmp = this.$store.getters['user/user']
      let initPromise = Promise.resolve(userTmp)

      if (userTmp && userTmp.id < 0) {
        initPromise = this.$store.dispatch('user/createAnon')
      }

      return initPromise
        .then(user => {
          return this.$store.dispatch('projects/getProjectsByUserId',
            { user: user.id })
        })
        .catch(err => {
          this.$store.commit('toasts/toastAdd', err)
        })
    }
  }
}
</script>
