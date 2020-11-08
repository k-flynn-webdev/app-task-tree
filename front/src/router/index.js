import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './user'
import itemRoutes from './items'
import Home from '../views/Home.vue'

import store from '../store/index'
import { get } from 'lodash-es'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    beforeEnter: (to, from, next) => {
      if (get(store, 'state.user.user.role', 'none') === 'admin') {
        next()
      } else {
        next ({ name: 'home' })
      }
    },
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  ...userRoutes,
  ...itemRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
