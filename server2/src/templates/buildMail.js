const fs = require('fs')
const juice = require('juice')

juice.juiceFile('./create.html', { preserveMediaQueries: false, applyStyleTags: true }, function (err, html) {
  if (err) throw Error(err)
  console.log('success')
  fs.writeFile('./dist/create.html', html, (err) => {
    if (err) throw Error(err)
    console.log('complete')
  })
})
