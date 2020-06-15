<template>
  <div class="user__info__mini flex-row">
    <p class="user__info__mini-name upper md text-bold">
      {{ user.name }}
    </p>
    <icUser class="user__info__mini-icon" />
  </div>
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
