// inject env file vars ..
const fs = require('fs')
const path = require('path')
const dotEnv = require('dotenv')
const configPath = getEnvPath()
const appVersion = require('../package.json').version
const mailStrings = require('./mail.string.config.js')
const envs = dotEnv.config({ path: configPath })

function getEnvPath () {
  if (process.env.NODE_ENV.toLowerCase() === 'production') {
    return 'vars.prod.env'
  }
  if (process.env.NODE_ENV.toLowerCase() === 'development') {
    return 'vars.dev.env'
  }
  if (process.env.NODE_ENV.toLowerCase() === 'test') {
    return 'vars.test.env'
  }
}

// This error should crash whole process
if (!fs.existsSync(configPath)) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

module.exports = {
  web: {
    name: envs.parsed.WEB_NAME,
    address: envs.parsed.WEB_ADDRESS
  },
  port: parseInt(envs.parsed.PORT, 10),
  ip: envs.parsed.IP,
  version: appVersion,
  rate: {
    time: 10 * 60 * 1000,
    max: envs.parsed.RATE_LIMIT_MAX
  },
  secure: {
    salt: Number(envs.parsed.SALT_ROUNDS),
    hash: Number(envs.parsed.HASH_SECRET)
  },
  token: {
    expires: Number(envs.parsed.TOKEN_EXPIRE),
    secret: envs.parsed.TOKEN_SECRET
  },
  node_env: process.env.NODE_ENV.toLowerCase(),
  db: {
    url: envs.parsed.DATABASE_URL,
    port: envs.parsed.DATABASE_PORT,
    user: envs.parsed.DATABASE_USER,
    pass: envs.parsed.DATABASE_PASS,
    database: envs.parsed.DATABASE_NAME
  },
  mail: {
    active: envs.parsed.MAIL_ACTIVE,
    api: envs.parsed.MAIL_API,
    host: envs.parsed.MAIL_HOST,
    domain: envs.parsed.MAIL_DOMAIN,
    strings: mailStrings
  }
}

