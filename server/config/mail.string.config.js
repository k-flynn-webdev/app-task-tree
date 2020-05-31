
const welcomeMsg = ((link) => {
  `Hello, you've signed up to isitup.kubedev.co.uk, to get started visit :
http://127.0.0.1:8080/user/verify/${link}`
})
const verifyMsg = ((link) => {
  `Hello, you've recently changed your account email or password, to verify please visit :
http://127.0.0.1:8080/user/verify/${link}`
})
const resetMsg = ((link) => {
  `Hello, you've recently requested a reset on your account password, to get started visit :
http://127.0.0.1:8080/user/reset/${link}`
})
const updateMsg = ((link) => {
  `Hello, you've recently updated your account, if this wasn't you please visit :
http://127.0.0.1:8080/user/help/${link}`
})


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
