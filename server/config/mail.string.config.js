const constants = require('../constants/index')

const welcomeMsg = ((userName, link, address, name) => {
  return {
    title: 'Welcome',
    actionText: `Hello ${userName}, you've signed up to ${name}, to finish visit the link.`,
    actionURL: `${address}${constants.paths.API_USER_VERIFY(link, '')}`,
    actionURLText: 'Verify link',
    text: `Hello ${userName}, you've signed up to ${name}, to finish visit ${address}${constants.paths.API_USER_VERIFY(link, '')}.`
  }
})
// const welcomeMsg = ((link, address, name) => {
//   return `Hello, you've signed up to ${name}, to finish setting up, please visit :
// ${address}${constants.paths.API_USER_VERIFY(link, '')}`
// })
const verifyMsg = ((link, address) => {
  return `Hello, you've recently changed your account email or password, to verify please visit :
${address}${constants.paths.API_USER_VERIFY(link, '')}`
})
const resetMsg = ((link, address) => {
  return `Hello, you've recently requested to reset your account password, to get started visit :
${address}${constants.paths.API_USER_RESET(link, '')}`
})
const updateMsg = ((link, address) => {
  return `Hello, you've recently updated your account, if this wasn't you please visit :
${address}user/help/${link}`
}) // todo help link


module.exports = {
  create: {
    from: '"Kubedev" <hi@kubedev.co.uk>',
    subject: 'Welcome',
    msg: welcomeMsg
  },
  verify: {
    from: '"Kubedev" <hi@kubedev.co.uk>',
    subject: 'Account verify',
    msg: verifyMsg
  },
  reset: {
    from: '"Kubedev" <hi@kubedev.co.uk>',
    subject: 'Account reset',
    msg: resetMsg
  },
  update: {
    from: '"Kubedev" <hi@kubedev.co.uk>',
    subject: 'Account updated',
    msg: updateMsg
  }
}
