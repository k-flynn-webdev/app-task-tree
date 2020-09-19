export const LOGIN = {
  route: { name: 'login', path: '/login' },
  API: {
    POST: '/api/authentication',
    DELETE: '/api/authentication'
  }
}

export const VERIFY = {
  route: { name: 'verify', path: '/verify' },
  API: { GET: '/api/verify' }
}

export const RECOVER = {
  route: { name: 'recover', path: '/recover' },
  API: {
    GET: '/api/recover',
    PATCH: '/api/recover'
  }
}

export const USER = {
  route: { name: 'user', path: '/user' },
  API: {
    GET: '/api/users/me',
    POST: '/api/users',
    PATCH: '/api/users',
    DELETE: '/api/users',
  }
}

export const PROJECTS = {
  route: { name: 'projects', path: '/projects' },
  API: {
    GET: '/api/projects',
    POST: '/api/projects',
    PATCH: '/api/projects',
    DELETE: '/api/projects',
  }
}

export const MODES = [
  { mode: 'Minitask', value: 'Minitask'},
  { mode: 'projects', value: '' },
  { mode: 'plans', value: '' },
  { mode: 'tasks', value: '' }
]
