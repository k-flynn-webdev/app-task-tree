<template>
  <div id="app" class="task">

    <ToastHolder />

    <div class="task__header">
      <h1>Mini-task</h1>
    </div>

<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/task">Task</router-link>-->
<!--    </div>-->

    <router-view />

    <div class="task__footer">
      <p>footer</p>
    </div>

  </div>
</template>

<script>
import ToastHolder from './components/ToastHolder'

export default {
  name: 'App',
  components: {
    ToastHolder
  }
}
</script>
