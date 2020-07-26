<template>
  <router-link to="/user"
    class="task__project__header__user"
    :tabindex="[ isEnabled? 0: -1 ]"
    :class="{ 'DISABLED': !isEnabled }"
    title="go to user">

    <div class="flex-row no-wrap">
      <p class="task__project__header__user-name upper text-bold hide-sm-down">
        {{ userName }}
      </p>
      <icUser
        v-if="isUser && isLoggedIn"
        class="task__project__header__user-icon"
        :class="{ 'DISABLED': !isEnabled }" />
      <icUserAnon
        v-if="isAnon"
        class="task__project__header__user-icon"
        :class="{ 'DISABLED': !isEnabled }" />
      <icUserNone
        v-if="user.id < 0"
        class="task__project__header__user-icon"
        :class="{ 'DISABLED': !isEnabled }" />
    </div>

  </router-link>
</template>

<script>
import status from '../constants/status'
import icUser from '../assets/icons/ic_user'
import icUserAnon from '../assets/icons/ic_user_anon'
import icUserNone from '../assets/icons/ic_user_none'

export default {
  name: 'UserInfoMini',
  components: {
    icUser,
    icUserAnon,
    icUserNone
  },
  props: {
    isEnabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isAnon: function () {
      return this.user.role === status.ANON
    },
    isUser: function () {
      return this.user.role !== status.ANON
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    userName: function () {
      if (!this.isEnabled) return '...'
      return this.user.name
    },
    isLoggedIn: function () {
      return this.$store.getters['user/isLoggedIn']
    }
  }
}
</script>
