<template>
  <div class="relative">

    <div class="task__project__header">

      <ProjectInfoName :mode="mode" />

    </div>

    <div class="task__project__header__controls">

      <div class="flex-row">
        <ProjectTaskSwitch :mode="mode" :is-enabled="validUser" />

        <UserInfoMini :is-enabled="validUser" />
      </div>

      <InputBar :mode="mode" :is-enabled="validUser" />

    </div>

  </div>
</template>

<script>
import modes from '../constants/modes'
import general from '../constants/general'
import InputBar from '../components/InputBar'
import UserInfoMini from '../components/UserInfoMini'
import ProjectInfoName from '../components/ProjectInfoName'
import ProjectTaskSwitch from '../components/ProjectTaskSwitch'

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
      default: modes.CLEAR
    },
    user: {
      type: Object,
      default: general.DEFAULT_USER()
    },
    validUser: {
      type: Boolean,
      default: false
    }
  }
}
</script>
