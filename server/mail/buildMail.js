const fs = require('fs')
const juice = require('juice')

juice.juiceFile('./action.html', { preserveMediaQueries: false, applyStyleTags: true }, function (err, html) {
  if (err) return console.log(err)
  console.log('success')
  fs.writeFile('./dist/action.html', html, (err) => {
    if (err) return console.log(err)
    console.log('complete')
  })
})
