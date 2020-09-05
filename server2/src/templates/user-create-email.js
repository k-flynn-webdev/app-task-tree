// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const pug = require('pug')
const path = require('path')

// CREATE TEMPLATE EMAIL
const createTemplatePath = path.join(__dirname, '..', 'templates','dist','create.html')
const createPugFn = pug.compileFile(createTemplatePath)

const getSubject = (ctx, userData) => { return `Welcome to ${ctx.app.get('web').name}` }
const getLinkURL = (ctx, userData) => { return `${ctx.app.get('web').address}/verify/${userData.verify}` }
const getEmailText = (ctx, userData) => { return `Hello you've recently signed up to ${ctx.app.get('web').name}, to finish visit the link.` }
const getTextOnly = (ctx, userData) => { return `Hello you've recently signed up to ${ctx.app.get('web').name}, to finish visit ${ctx.app.get('web').address}/verify/${userData.verify}` }
const createDetails = (ctx, userData) => {
  return {
    to: userData.email,
    subject: getSubject(ctx, userData),
    text: getTextOnly(ctx, userData),
    emailText: getEmailText(ctx, userData),
    linkText: 'verify',
    linkURL: getLinkURL(ctx, userData),
    appHost: ctx.app.get('web').name,
    appTwitter: ctx.app.get('web').twitter.name,
    appTwitterURL: ctx.app.get('web').twitter.address,
  }
}

module.exports = (ctx, userData) => {
  const temp = createDetails(ctx, userData)
  return {
    ...temp,
    html: createPugFn(temp)
  }
}
