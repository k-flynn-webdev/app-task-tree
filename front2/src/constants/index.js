const API_PATHS = {
  USER: {
    LOGIN: '/api/authentication',
    LOGOUT: '/api/authentication',
    GET: '/api/users/me',
    POST: '/api/users',
    PATCH: '/api/users',
    DELETE: '/api/users',
    VERIFY: '/api/verify',
    RECOVER: '/api/recover',
  }
}

const MODES = [
  { mode: 'Minitask', value: 'Minitask'},
  { mode: 'project', value: '' },
  { mode: 'plan', value: '' },
  { mode: 'task', value: '' }
]

export default {
  API: API_PATHS,
  MODES,
}
