const { MethodNotAllowed } = require('@feathersjs/errors')
const readLastLines = require('read-last-lines')
const lineToReadTail = 40

/* eslint-disable no-unused-vars */
exports.AdminLatest = class AdminLatest {
  constructor (options) {
    this.options = options || {}
  }

  setup(app) {
    this.app = app;
  }

  async find () {
    return readLastLines.read('log/activity.log', lineToReadTail, 'utf-8')
      .then(linesBlob => {
        const items = Object.values(Object.assign({}, linesBlob)).join('').split('\n')
        const itemLines = items.reduce((acc, current) => {
          const tmp = current.split('|')

          if (tmp[0] && tmp[0].length > 0 &&
            tmp[1] && tmp[1].length > 0) {
            acc.push({
              time: tmp[0] ? tmp[0].trim() : '',
              user: tmp[1] ? tmp[1].trim() : '',
              msg: tmp[2] ? tmp[2].trim() : ''
            })
          }

          return acc
        }, [])

        return { data: itemLines }
      })
  }

  async get () {
    throw new MethodNotAllowed()
  }
  async create () {
    throw new MethodNotAllowed()
  }
  async update () {
    throw new MethodNotAllowed()
  }
  async patch () {
    throw new MethodNotAllowed()
  }
  async remove () {
    throw new MethodNotAllowed()
  }
}
