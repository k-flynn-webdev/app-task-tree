<template>
  <router-link to="/user"
    class="task__project__header__user"
    title="go to user">

    <div class="flex-row no-wrap">
      <p class="task__project__header__user-name upper text-bold hide-sm-down">
        {{ user.name }}
      </p>
      <icUser class="task__project__header__user-icon" />
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
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    }
  }
}
</script>
