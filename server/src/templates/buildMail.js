const fs = require('fs')
const juice = require('juice')
var dir = './src/templates/dist';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const ALL_TEMPLATES = [
  't_verify.html',
  't_create.html',
  't_recover.html'
]

;ALL_TEMPLATES.forEach(item => {
  juice.juiceFile(`./src/templates/${item}`,
    { preserveMediaQueries: false, applyStyleTags: true },
    function (err, html) {
      if (err) throw Error(err)
      console.log('success')
      fs.writeFile(`./src/templates/dist/${item}`, html, (err) => {
        if (err) throw Error(err)
        console.log('complete')
      })
    })
})

