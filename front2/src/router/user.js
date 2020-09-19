export default [
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  },
  {
    path: '/verify/:token',
    name: 'verify',
    component: () => import(/* webpackChunkName: "verify" */ '../views/Verify.vue')
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  },
  {
    path: '/recover/:token',
    name: 'recover-token',
    component: () => import(/* webpackChunkName: "recover" */ '../views/Recover.vue')
  }
]
