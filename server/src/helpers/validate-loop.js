// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const get = require('lodash').get
const { BadRequest } = require('@feathersjs/errors')

/**
 * Validate an array of Joi objects against the data values
 *
 * @param {array<object>} testItems   Array of tests
 * @param context
 * @return {data}
 */
module.exports = (testItems, context) => {
  if (!context.data) throw new BadRequest('Missing params.', {})
  if (Object.keys(context.data).length < 1) throw new BadRequest('Missing params.', {})

  for (let i = 0; i < testItems.length; i ++) {
    const testFunc = testItems[i][0]
    const testParam = testItems[i][1]
    const testRequire = testItems[i][2]

    const source = context.data[testParam] ? context.data[testParam] : ''
    const sourceTrim = source.trim ? source.trim() : source

    const test = testFunc.validate(sourceTrim)

    if (testRequire && test.error) {
      throw new BadRequest(get(test, 'error.details[0].message',
        'An error occurred on validation.'), {})
    }
  }

  return context
}
