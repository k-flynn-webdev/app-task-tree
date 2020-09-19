import { PROJECTS } from '../constants/index'

export default [
  {
    path: PROJECTS.route.path,
    name: PROJECTS.route.name,
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  }
]
