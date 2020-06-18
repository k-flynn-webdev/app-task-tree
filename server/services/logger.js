const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

let accessLogStream = null
let testing = process.env.NODE_ENV === 'test'

// morgan.token('id', function(req, res) {
//   return req.id || '-'
// })


morgan.token('id', function getId (req) {
  return req.id
})

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
    morganType = ':date[iso] :id :method :url :status :res[content-length] :remote-addr :response-time ms'
  }

  app.use(morgan(morganType, { stream: accessLogStream }))
  app.use(morgan(morganType))
}

exports.Init = Init


function Log(line, req = { id: '-' }) {

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

  const date = new Date().toISOString()

  process.stdout.write(date + ' ' + req.id + ' ' + line)
  accessLogStream.write(date + ' ' + req.id + ' ' + line)
}

exports.Log = Log

