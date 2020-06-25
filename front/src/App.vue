<template>
  <div
    id="app"
    class="task"
    :class="{ 'max-screen-size': hasToast }">

    <ToastHolder />

<!--    <h1 class="task__header">-->
<!--      Mini-task-->
<!--    </h1>-->

<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/task">Task</router-link>-->
<!--    </div>-->

    <router-view />

    <div class="task__footer">
      <p>footer</p>
<!--      <router-link to="/switch">Switch</router-link>-->
    </div>

  </div>
</template>

<script>
import ToastHolder from './components/general/ToastHolder'

export default {
  name: 'App',
  components: {
    ToastHolder
  },
  computed: {
    hasToast: function () {
      return this.$store.getters['toasts/toasts'].length > 0
    }
  }
}
</script>
