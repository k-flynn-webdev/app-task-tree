// // const app = require('../app.js');
// const dbConnection = require('../interfaces/db_init_sql')
// const config = require('../config/config.js');
// const waitTime = 10 * 1000
//
// // dbConnection.Init(app)
//
// // jest.setTimeout(3 * 60 * 1000);
//
// beforeAll(() => {
// 	// wait 10 seconds for startup/cleanup
// }, waitTime)
//
// beforeEach(function(done) {
// 	// todo need to clear sql transactions!!
// 	return done();
// });
//
// afterEach(function(done) {
// 	// mongoose.disconnect();
// 	return done();
// });
//
// afterAll(done => {
// 	// mongoose.disconnect();
// 	return done();
// }, waitTime);