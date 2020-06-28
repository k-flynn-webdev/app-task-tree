//Require the dev-dependencies
const path = require('path')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Helper functions', () => {

	let path_temp = path.join(__dirname)
	let array_temp = ['1','1','1','1','1']
	let dir_find = require('../helpers/dir_find.js')
	let list_to_string = require('../helpers/list_to_string.js')

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
    let tmp = list_to_string(array_temp)
		chai.expect(tmp).to.equal('[ 1, 1, 1, 1, 1 ]')
		done()
	})

})


