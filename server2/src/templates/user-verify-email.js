// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const pug = require('pug')
const path = require('path')

// VERIFY TEMPLATE EMAIL
const templatePath = path.join(__dirname, '..', 'templates','dist','t_verify.html')
const pugFn = pug.compileFile(templatePath)

const getSubject = (ctx, userData) => { return `Recently updated your account at updated your account at ${ctx.app.get('web').name}` }
const getLinkURL = (ctx, userData) => { return `${ctx.app.get('web').address}/verify/${userData.verify}` }
const getEmailText = (ctx, userData) => { return `Hello you've recently updated your account details at ${ctx.app.get('web').name}, to verify the changes visit the link.` }
const getTextOnly = (ctx, userData) => { return `Hello you've recently updated your account details at ${ctx.app.get('web').name}, to verify the changes visit ${ctx.app.get('web').address}/verify/${userData.verify}` }
const emailDetails = (ctx, userData) => {
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
  const temp = emailDetails(ctx, userData)
  return {
    ...temp,
    html: pugFn(temp)
  }
}
