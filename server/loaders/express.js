const cors = require('cors')
const filter = require('content-filter')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const logger = require('../services/logger.js')

const EventEmitter = require('events').EventEmitter
const myEmitter = new EventEmitter

const config = require('../config/config.js')

module.exports = function (app) {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy')

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors())

    app.use(filter()) // prevent db attacks in urls

    app.use(rateLimit({
      windowMs: config.rate.time,
      max: config.rate.max,
      message: {
        status: 429,
        message: 'Too many requests.'
      }}))

    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places
    // where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(require('method-override')('_method'))

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())

    // Set default json response header ..
    app.set('json spaces', 4)

    logger.Log('	✅ Express setup.')
    return Promise.resolve()
}

