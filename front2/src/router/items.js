import { PROJECTS, PLANS, TASKS } from '../constants/index'

export default [
  {
    path: PROJECTS.route.path,
    name: PROJECTS.route.name,
    props: {
      type: 'project'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  },
  {
    path: PLANS.route.path,
    name: PLANS.route.name,
    props: {
      type: 'plan'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  },
  {
    path: TASKS.route.path,
    name: TASKS.route.name,
    props: {
      type: 'task'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  }
]
