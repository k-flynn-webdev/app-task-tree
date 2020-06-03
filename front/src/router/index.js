import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Paths from '../constants/paths.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: Paths.HOME,
    component: Home
  },
  {
    path: '/task',
    name: Paths.TASK,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "task" */ '../views/Task.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
