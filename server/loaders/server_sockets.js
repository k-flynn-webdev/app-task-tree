// Here we import all external API websockets
const fs = require('fs')
const path = require('path')

const logger = require('../services/logger.js')
const dirFind = require('../helpers/dir_find.js')
const listToString = require('../helpers/list_to_string.js')

function ServerSockets(app) {

  return new Promise( (resolve, reject) => {

    let tempDir = path.join(__dirname, '..', 'api', 's_sockets')

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    dirFind(tempDir, '.js', function (err, result) {

      if (err) {
        return reject(err)
      }

      // apply sockets ..
      for (let i = 0; i < result.length; i++) {
        try {
          require(path.join(tempDir, result[i]))(app)
        } catch (e) {
          return reject(e)
        }
      }
      const newLine = '\t\t\t\t\t\t\t  '
      logger.Log('\t✅ Server Sockets\t' +
        listToString(result, '[ ', ' ]', 60, newLine))
      return resolve()
    })
  })
}

module.exports = ServerSockets
