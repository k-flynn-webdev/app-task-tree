<template>
  <router-link to="/user"
    class="task__project__header__user"
    :class="{ 'DISABLED': !isEnabled }"
    title="go to user">

    <div class="flex-row no-wrap">
      <p class="task__project__header__user-name upper text-bold hide-sm-down">
        {{ userName }}
      </p>
      <icUser class="task__project__header__user-icon"
        :class="{ 'DISABLED': !isEnabled }" />
    </div>

  </router-link>
</template>

<script>
import icUser from '../assets/icons/ic_user'

export default {
  name: 'UserInfoMini',
  components: {
    icUser
  },
  props: {
    isEnabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    userName: function () {
      if (!this.isEnabled) return '...'
      return this.$store.getters['user/user'].name
    }
  }
}
</script>
