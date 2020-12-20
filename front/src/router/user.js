import { USER, CREATE, LOGIN, RECOVER, VERIFY } from '../constants'

export default [
  {
    path: USER.route.path,
    name: USER.route.name,
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: CREATE.route.path,
    name: CREATE.route.name,
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
  },
  {
    path: LOGIN.route.path,
    name: LOGIN.route.name,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  },
  {
    path: VERIFY.route.path + '/:token',
    name: VERIFY.route.name,
    component: () => import(/* webpackChunkName: "verify" */ '../views/Verify.vue')
  },
  {
    path: RECOVER.route.path,
    name: RECOVER.route.name,
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  },
  {
    path: RECOVER.route.path + '/:token',
    name: RECOVER.route.name + '-token',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  }
]
