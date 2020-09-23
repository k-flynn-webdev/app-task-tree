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

export const PROJECTS = {
  value: 'project',
  store: 'projects',
  route: { name: 'projects', path: '/projects' },
  API: {
    GET: '/api/projects',
    POST: '/api/projects',
    PATCH: '/api/projects',
    DELETE: '/api/projects',
  }
}

export const PLANS = {
  value: 'plan',
  route: { name: 'plans', path: '/plans' },
  API: {
    GET: '/api/plans',
    POST: '/api/plans',
    PATCH: '/api/plans',
    DELETE: '/api/plans',
  }
}

export const TASKS = {
  value: 'task',
  route: { name: 'tasks', path: '/tasks' },
  API: {
    GET: '/api/tasks',
    POST: '/api/tasks',
    PATCH: '/api/tasks',
    DELETE: '/api/tasks',
  }
}

export const TYPES = {
  project: PROJECTS,
  plan: PLANS,
  task: TASKS
}

export const MODES = [
  { mode: 'Minitask', value: 'Minitask'},
  { mode: 'projects', value: '' },
  { mode: 'plans', value: '' },
  { mode: 'tasks', value: '' }
]
