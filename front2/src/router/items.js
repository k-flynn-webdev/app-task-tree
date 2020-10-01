import { PROJECT, PLAN, TASK } from '../constants/index'

export default [
  {
    path: PROJECT.route.path,
    name: PROJECT.route.name,
    props: {
      type: 'project'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Projects.vue')
  },
  {
    path: PLAN.route.path,
    name: PLAN.route.name,
    props: {
      type: 'plan'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Plans.vue')
  },
  {
    path: TASK.route.path,
    name: TASK.route.name,
    props: {
      type: 'task'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Tasks.vue')
  }
]
