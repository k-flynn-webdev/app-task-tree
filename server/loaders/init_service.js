//Here we Init all service funcs that have a .Init(app).
const fs = require('fs')
const path = require('path')

const logger = require('../services/logger.js')
const dirFind = require('../helpers/dir_find.js')
const listToString = require('../helpers/list_to_string.js')

function InitServices(app) {

  return new Promise( (resolve, reject) => {

    let tempDir = path.join(__dirname, '..', 'services')

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    dirFind(tempDir, '.js', function (err, result) {

      if (err) {
        return reject(err)
      }

      let initFiles = []

      // apply Init interfaces ..
      for (let i = 0; i < result.length; i++) {
        try {
          let tmp = require(path.join(tempDir, result[i]))
          if (tmp.Init !== undefined) {
            tmp.Init(app)
            initFiles.push(result[i])
          }
        } catch (e) {
          return reject(e)
        }
      }

      const newline = '\t\t\t\t\t\t\t  '
      logger.Log('\t✅ Services.Init()\t' +
        listToString(initFiles, '[ ', ' ]', 60, newline))
      return resolve()
    })
  })
}

module.exports = InitServices
