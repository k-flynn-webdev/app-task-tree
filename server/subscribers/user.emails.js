const constants = require('../constants')
const config = require('../config/config')
const pug = require('pug')

/**
 * Init the User email events
 *
 * @param app
 * @return {boolean}
 */
function Init(app) {
  app.on(constants.events.CREATE_ACCOUNT, AccountCreate)
  app.on(constants.events.UPGRADE_ACCOUNT, AccountCreate)
  app.on(constants.events.VERIFY_ACCOUNT, AccountVerify)
  app.on(constants.events.RESET_ACCOUNT, AccountReset)
  app.on(constants.events.UPDATED_ACCOUNT, AccountUpdate)

  return true
}

module.exports = Init


// const templateAction = require('../mail/dist/action.html')

// Compile the source code
const createdUser = pug.compileFile('mail/dist/action.html');



/**
 * Send a user account creation email
 *
 * @param user 	{Object}	user object
 */
const AccountCreate = (user) => {
  // const emailTextRender = mailConfig.strings.create.msg(user.name, user.verify, config.web.address, config.web.name)
  // EmailSend({
  //   from: mailConfig.strings.create.from,
  //   to: user.email,
  //   subject: mailConfig.strings.create.subject,
  //   html: createdUser(emailTextRender),
  //   text: emailTextRender.text
  // })
}

/**
 * Send a user account verify email
 *
 * @param user 	{Object}	user object
 */
const AccountVerify = (user) => {
  // EmailSend({
  //   from: mailConfig.strings.verify.from,
  //   to: user.email,
  //   subject: mailConfig.strings.verify.subject,
  //   text: templateAction })
    // text: mailConfig.strings.verify.msg(user.verify, config.web.address)})
}

/**
 * Send a user reset email
 *
 * @param user 	{Object}	user object
 */
const AccountReset = (user) => {
  // EmailSend({
  //   from: mailConfig.strings.reset.from,
  //   to: user.email,
  //   subject: mailConfig.strings.reset.subject,
  //   text: mailConfig.strings.reset.msg(user.recover, config.web.address)})
}

/**
 * Inform a user has been updated
 *
 * @param user 	{Object}	user object
 */
const AccountUpdate = (user) => {
  // EmailSend({
  //   from: mailConfig.strings.update.from,
  //   to: user.email,
  //   subject: mailConfig.strings.update.subject,
  //   text: mailConfig.strings.update.msg(user.verify, config.web.address)})
}


// const welcomeMsg = ((userName, link, address, name) => {
//   return {
//     title: 'Welcome',
//     actionText: `Hello ${userName}, you've signed up to ${name}, to finish visit the link.`,
//     actionURL: `${address}${constants.paths.API_USER_VERIFY(link, '')}`,
//     actionURLText: 'Verify link',
//     text: `Hello ${userName}, you've signed up to ${name}, to finish visit ${address}${constants.paths.API_USER_VERIFY(link, '')}.`
//   }
// })
// // const welcomeMsg = ((link, address, name) => {
// //   return `Hello, you've signed up to ${name}, to finish setting up, please visit :
// // ${address}${constants.paths.API_USER_VERIFY(link, '')}`
// // })
// const verifyMsg = ((link, address) => {
//   return `Hello, you've recently changed your account email or password, to verify please visit :
// ${address}${constants.paths.API_USER_VERIFY(link, '')}`
// })
// const resetMsg = ((link, address) => {
//   return `Hello, you've recently requested to reset your account password, to get started visit :
// ${address}${constants.paths.API_USER_RESET(link, '')}`
// })
// const updateMsg = ((link, address) => {
//   return `Hello, you've recently updated your account, if this wasn't you please visit :
// ${address}user/help/${link}`
// }) // todo help link
//
//
// module.exports = {
//   create: {
//     from: '"Kubedev" <hi@kubedev.co.uk>',
//     subject: 'Welcome',
//     msg: welcomeMsg
//   },
//   verify: {
//     from: '"Kubedev" <hi@kubedev.co.uk>',
//     subject: 'Account verify',
//     msg: verifyMsg
//   },
//   reset: {
//     from: '"Kubedev" <hi@kubedev.co.uk>',
//     subject: 'Account reset',
//     msg: resetMsg
//   },
//   update: {
//     from: '"Kubedev" <hi@kubedev.co.uk>',
//     subject: 'Account updated',
//     msg: updateMsg
//   }
// }
