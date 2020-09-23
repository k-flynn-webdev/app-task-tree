import { PROJECTS } from '../constants/index'

export default [
  {
    path: PROJECTS.route.path,
    name: PROJECTS.route.name,
    props: {
      type: 'project'
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
  }
]
