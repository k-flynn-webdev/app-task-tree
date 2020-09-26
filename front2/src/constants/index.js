// todo : Add default func objects in each object


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
  value: 'project',
  store: 'projects',
  open: item => { return { name: 'plan', query: { project: item.id } } },
  // open: item => { return { go: `/plans?project=${item.id}`, name: 'plan' } },
  route: { name: 'project', path: '/projects' },
  API: {
    GET: '/api/projects',
    POST: '/api/projects',
    PATCH: '/api/projects',
    DELETE: '/api/projects',
  }
}

export const PLAN = {
  value: 'plan',
  store: 'plans',
  open: item => { return { name: 'task', query: { plan: item.id } } },
  // open: item => { return { go: `/tasks?plan=${item.id}`, name: 'task' } },
  route: { name: 'plan', path: '/plans' },
  API: {
    GET: '/api/plans',
    POST: '/api/plans',
    PATCH: '/api/plans',
    DELETE: '/api/plans',
  }
}

export const TASK = {
  value: 'task',
  store: 'tasks',
  open: null,
  route: { name: 'task', path: '/tasks' },
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
    title: 'Minitask'
  },
  project: PROJECT,
  plan: PLAN,
  task: TASK
}

