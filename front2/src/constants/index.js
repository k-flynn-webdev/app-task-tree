// todo : Add default func objects in each object

export const APP_VARS = {
  name: 'Minitask',
  pageLimit: 20,
  sort: {
    direction: ['asc', 'desc'],
    types: ['created_at']
  }
}

export const LOGIN = {
  value: 'login',
  route: { name: 'login', path: '/login' },
  API: {
    POST: '/api/authentication',
    DELETE: '/api/authentication'
  }
}

export const VERIFY = {
  value: 'verify',
  route: { name: 'verify', path: '/verify' },
  API: { GET: '/api/verify' }
}

export const RECOVER = {
  value: 'recover',
  route: { name: 'recover', path: '/recover' },
  API: {
    GET: '/api/recover',
    PATCH: '/api/recover'
  }
}

export const USER = {
  value: 'user',
  route: { name: 'user', path: '/user' },
  API: {
    GET: '/api/users/me',
    POST: '/api/users',
    PATCH: '/api/users',
    DELETE: '/api/users',
  }
}

export const PROJECT = {
  index: 3,
  text: 'projects',
  value: 'project',
  store: 'projects',
  parent: null,
  child: 'plan',
  children: ['project', 'plan', 'task'],
  route: {
    name: 'project',
    path: '/projects',
  },
  API: {
    GET: '/api/projects',
    POST: '/api/projects',
    PATCH: '/api/projects',
    DELETE: '/api/projects',
  }
}

export const PLAN = {
  index: 2,
  text: 'plans',
  value: 'plan',
  store: 'plans',
  parent: 'project',
  child: 'task',
  children: ['plan', 'task'],
  route: {
    name: 'plan',
    path: '/plans',
  },
  API: {
    GET: '/api/plans',
    POST: '/api/plans',
    PATCH: '/api/plans',
    DELETE: '/api/plans',
  }
}

export const TASK = {
  index: 1,
  text: 'tasks',
  value: 'task',
  store: 'tasks',
  parent: 'plan',
  child: null,
  children: ['task'],
  route: {
    name: 'task',
    path: '/tasks',
  },
  API: {
    GET: '/api/tasks',
    POST: '/api/tasks',
    PATCH: '/api/tasks',
    DELETE: '/api/tasks',
  }
}

export const TYPES = {
  home: {
    value: 'Minitask',
    route: {
      name: 'home',
      path: '/',
    },
  },
  project: PROJECT,
  plan: PLAN,
  task: TASK
}

