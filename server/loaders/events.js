//Here we import all internal events/subscribers
const fs = require('fs')
const path = require('path')

const logger = require('../services/logger.js')
const dirFind = require('../helpers/dir_find.js')
const listToString = require('../helpers/list_to_string.js')

function InitEvents(app) {

  return new Promise( (resolve, reject) => {

    let tempDir = path.join(__dirname, '..', 'subscribers')

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    dirFind(tempDir, '.js', function (err, result) {

      if (err) {
        return reject(err)
      }

      // apply event subscribers ..
      for (let i = 0; i < result.length; i++) {
        try {
          require(path.join(tempDir, result[i]))(app)
        } catch (e) {
          return reject(e)
        }
      }

      logger.Log('	✅ Event subscribers : ' + listToString(result))
      return resolve()
    })
  })
}

module.exports = InitEvents
