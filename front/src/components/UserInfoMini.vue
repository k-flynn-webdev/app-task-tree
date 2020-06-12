<template>
  <div class="user__info__mini">
    <h3 class="user__info__mini-name">
      {{ user.name }}
    </h3>
    <icUser class="user__info__mini-icon big" />
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
