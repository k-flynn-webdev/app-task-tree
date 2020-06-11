const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

let accessLogStream = null
let testing = process.env.NODE_ENV === 'test'

function Init(app) {

  if (testing) {
    return
  }

  let tempDir = path.join(__dirname, '..', 'log')

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  let morganType = null

  // Create a write stream (in append modes)
  if (!testing) {
    accessLogStream = fs.createWriteStream(path.join(tempDir, 'log'), { flags: 'a' })
    morganType = ':date[iso] :remote-addr :remote-user :method ' +
      ':url HTTP/:http-version :status :res[content-length] - :response-time ms'
  }

  app.use(morgan(morganType, { stream: accessLogStream }))
  app.use(morgan(morganType))
}

exports.Init = Init

function Log(line) {

  if (testing) {
    return
  }

  if (line.message !== undefined) {
    line = line.message
  }

  // make sure line ends with \n
  if (line.endsWith !== undefined && !line.endsWith('\n')) {
    line = line + '\n'
  }

  process.stdout.write(line)
  accessLogStream.write(line)
}

exports.Log = Log

