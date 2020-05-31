const fs = require('fs')
const path = require('path')

function DirFind(folder, ext='.js', next) {

  let tmpPaths = []
  let tmpFiles = []

  function isDir(input) {
    return input.indexOf('.') === -1
  }

  function isFile(input) {
    return input.endsWith(ext)
  }

  function getFiles(input) {

    let tmpPath = path.join(folder, input)

    fs.readdir(tmpPath, function (error, files) {

      if (error) {
        next(error)
      }

      for (let i = 0; i < files.length; i++) {
        if (isDir(files[i])) {
          tmpPaths.push(files[i])
        }

        if (isFile(files[i])) {
          tmpFiles.push(path.join(input, files[i]))
        }
      }

      if (tmpPaths.length > 0) {
        getFiles(tmpPaths.pop())
      } else {
        next(null, tmpFiles)
      }

    })
  }

  getFiles('')
};

module.exports = DirFind

