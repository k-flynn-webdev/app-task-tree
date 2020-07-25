import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import modes from '../constants/modes'
import Paths from '../constants/paths.js'
import Tasks from '../components/TasksList'
import Landing from '../components/Landing'
import Projects from '../components/ProjectsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    props: { mode: modes.CLEAR },
    children: [
      { path: '', name: Paths.HOME, component: Landing }
    ]
  },
  {
    path: '/projects',
    component: Home,
    props: { mode: modes.PROJECTS },
    children: [
      {
        path: '',
        name: Paths.PROJECTS,
        props: {},
        component: Projects
      }
    ]
  },
  // todo route for project info only (not its tasks) / future
  {
    path: '/project/:project',
    component: Home,
    props: (route) => ({
      mode: modes.TASKS,
      project: Number(route.params.project)
    }),
    children: [
      {
        path: '',
        name: Paths.PROJECT_TASKS,
        props: (route) => ({
          project: Number(route.params.project)
        }),
        component: Tasks
      }
    ]
  },
  {
    path: '/switch',
    name: 'switch',
    component: () => import(/* webpackChunkName: "Switch" */ '../views/Switch.vue')
  },
  {
    path: '/user',
    name: Paths.USER,
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue')
  },
  {
    path: '/user/create',
    name: Paths.USER_CREATE,
    component: () => import(/* webpackChunkName: "User" */ '../views/UserCreate.vue')
  },
  {
    path: '/user/login',
    name: Paths.USER_LOGIN,
    component: () => import(/* webpackChunkName: "User" */ '../views/UserLogin.vue')
  },
  {
    path: '/user/verify/:verify',
    component: Home,
    props: (route) => ({
      mode: modes.CLEAR,
      verify: route.params.verify
    }),
    children: [
      {
        path: '',
        name: Paths.USER_VERIFY,
        props: (route) => ({
          mode: modes.CLEAR,
          verify: route.params.verify
        }),
        component: () => import(/* webpackChunkName: "User" */ '../components/VerifyUser.vue')
      }
    ]
  },
  {
    path: '/user/reset',
    props: (route) => ({
      verify: ''
    }),
    name: Paths.USER_RESET,
    component: () => import(/* webpackChunkName: "User" */ '../views/UserReset.vue')
  },
  {
    path: '/user/reset/:verify',
    props: (route) => ({
      verify: route.params.verify
    }),
    name: Paths.USER_RESET_PASSWORD,
    component: () => import(/* webpackChunkName: "User" */ '../views/UserReset.vue')
  }

  // todo 404 page here
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
