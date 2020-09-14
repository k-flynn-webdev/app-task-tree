const API_PATHS = {
  USER: {
    LOGIN: '/api/authentication',
    GET: '/api/users/me',
    POST: '/api/users',
    PATCH: '/api/users',
    DELETE: '/api/users',
    VERIFY: '/api/verify',
    RECOVER: '/api/recover',
  }
}

export default {
  API: API_PATHS
}
