//Require the dev-dependencies
const path = require('path')
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Helper functions', () => {

	const path_temp = path.join(__dirname)
	const array_temp = ['1','1','1','1','1']
	const dir_find = require('../helpers/dir_find.js')
	const list_to_string = require('../helpers/list_to_string.js')

	it('"dir_find.js" should return an array of files.', (done) => {
		dir_find(path_temp, '.js', function(error, result){
			if(error){
				done(error)
			}

			result.length.should.be.above(0)
			done()
		})
	})

	it('"list_to_string" should return a string from an array.', (done) => {
    const tmp = list_to_string(array_temp)
		chai.expect(tmp).to.equal('[ 1, 1, 1, 1, 1 ]')
		done()
	})

})


