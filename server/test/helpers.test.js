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

	it('"dir_find.js" should return an array of files.', () => {
		dir_find(path_temp, '.js', (err, result) => {
			const testResult = result.length > 0
			expect(testResult).toBe(true)
		})
	})

	it('"list_to_string" should return a string from an array.', () => {
		expect(list_to_string(array_temp)).toEqual('[ 1, 1, 1, 1, 1 ]')
	})

})


