<template>
  <div class="relative">

    <div class="task__project__header">

      <ProjectInfoName :mode="mode" />

    </div>

    <div class="task__project__header__controls">

      <div class="flex-row">
        <ProjectTaskSwitch :mode="mode" :is-enabled="isValidUser" />

        <UserInfoMini :is-enabled="isValidUser" />
      </div>

      <InputBar :mode="mode" :is-enabled="isValidUser" />

    </div>

  </div>
</template>

<script>
import InputBar from '../components/InputBar'
import UserInfoMini from '../components/UserInfoMini'
import ProjectInfoName from '../components/ProjectInfoName'
import ProjectTaskSwitch from '../components/ProjectTaskSwitch'
import { mapGetters } from 'vuex'
import status from '../constants/status'

export default {
  name: 'Header',
  components: {
    InputBar,
    UserInfoMini,
    ProjectInfoName,
    ProjectTaskSwitch
  },
  props: {
    mode: {
      type: String,
      default: status.CLEAR
    }
  },
  computed: {
    ...mapGetters({
      isValidUser: 'user/isValidUser'
    })
  }
}
</script>
