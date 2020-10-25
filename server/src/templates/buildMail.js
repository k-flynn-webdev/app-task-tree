const fs = require('fs')
const juice = require('juice')

juice.juiceFile('./t_verify.html', { preserveMediaQueries: false, applyStyleTags: true }, function (err, html) {
  if (err) throw Error(err)
  console.log('success')
  fs.writeFile('./dist/t_verify.html', html, (err) => {
    if (err) throw Error(err)
    console.log('complete')
  })
})
