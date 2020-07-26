const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const config = require('../config/config')

let accessLogStream = null

morgan.token('id', function getId (req) {
  return req.id
})

function getUserId (req, item) {
  if (req &&
    req.body &&
    req.body.token &&
    req.body.token.id) return req.body.token.id
  if (item && item.id) return item.id
  return '-'
}

morgan.token('user_token_id', function (req, res) {
  return getUserId(req)
})

function Init(app) {

  let tempDir = path.join(__dirname, '..', 'log')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  let morganType = null

  // Create a write stream (in append modes)
  if (config.node_env !== 'test') {
    accessLogStream = fs.createWriteStream(path.join(tempDir, 'log'),
      { flags: 'a' })
    morganType = ':date[iso] :id :user_token_id :method :url :status :res[content-length] :remote-addr :response-time ms'

    app.use(morgan(morganType, { stream: accessLogStream }))
    app.use(morgan(morganType))
  }
}

exports.Init = Init


function Log(line, req = { id: '-' }, account ) {

  if (config.node_env === 'test') {
    return
  }

  if (line.message !== undefined) {
    line = line.message
  }

  // make sure line ends with \n
  if (line.endsWith !== undefined && !line.endsWith('\n')) {
    line = line + '\n'
  }

  const date = new Date().toISOString()

  const lineToRender = [
    date,
    req.id,
    getUserId(req, account),
    line ]

  process.stdout.write(lineToRender.join(' '))
  accessLogStream.write(lineToRender.join(' '))
}

exports.Log = Log

