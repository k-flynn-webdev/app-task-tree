const sanitizer = require('sanitizer').sanitize

/**
 * Prepare/sanitize incoming user data from a request
 *
 * @param req   incoming request obj
 * @param res   outgoing response obj
 * @param next  the cb
 */
function prepare(req, res, next) {

  let tmpToken = null
  let tmpParams = null
  let tmpQuery = null
  let tmpBody = null

  if (req.body && req.body.token) {
    tmpToken = Object.assign({}, req.body.token)
    delete req.body.token
  }

  if (req.params) {
    tmpParams = Object.assign({}, req.params)
    Object.keys(tmpParams).map(item => {
      tmpParams[item] = sanitizer(tmpParams[item])
    })
    delete req.params
  }

  if (req.query) {
    tmpQuery = Object.assign({}, req.query)
    Object.keys(tmpQuery).map(item => {
      tmpQuery[item] = sanitizer(tmpQuery[item])
    })
    delete req.query
  }

  if (req.body) {
    tmpBody = Object.assign({}, req.body)
    Object.keys(tmpBody).map(item => {
      tmpBody[item] = sanitizer(tmpBody[item])
    })
    delete req.body
  }

  req.body = Object.assign({}, tmpBody)
  req.query = Object.assign({}, tmpQuery)
  req.params = Object.assign({}, tmpParams)

  if (tmpToken) {
    req.body.token = tmpToken
  }

  next()
}

module.exports = prepare
