module.exports = {
  apps: [
    {
    name: 'app-daytask',
    script: 'app.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    autorestart: true,
    watch: true,
    max_memory_restart: '150M',
    ignore_watch: ['Log/Log', 'node_modules'],
  },
  ],
}
