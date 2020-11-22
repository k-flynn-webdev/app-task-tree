const task = require('./task/task.service.js')
const plan = require('./plan/plan.service.js')
const users = require('./users/users.service.js')
const email = require('./email/email.service.js')
const verify = require('./verify/verify.service.js')
const recover = require('./recover/recover.service.js')
const project = require('./project/project.service.js')
const admin = require('./admin/admin.service.js')


// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(email)
  app.configure(verify)
  app.configure(recover)
  app.configure(task)
  app.configure(plan)
  app.configure(project)
  app.configure(admin)
}
