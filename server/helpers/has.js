/**
 * Check if an Item has a uppercase letter present
 *
 * @param 	{String}		input
 * @returns {boolean}
 */
function UpperCase(input) {
  let tmpNoNumber = input.replace(/[^A-Za-z]/g, '')
  let upperTmp = tmpNoNumber.toLocaleUpperCase()
  for (let i = 0; i < tmpNoNumber.length; i++) {
    if (tmpNoNumber.charAt(i) === upperTmp.charAt(i)) return true
  }

  return false
}

exports.UpperCase = UpperCase

/**
 * Returns all numeric from a string
 *
 * @param 	{String} 	input
 * @returns {boolean}
 */
function Number(input) {
  let strip = input.replace(/\D/g, '')
  return (strip.length > 0)
}

exports.Number = Number

/**
 * Returns if is numeric
 *
 * @param 	{number} 	input
 * @returns {boolean}
 */
function isNumber(input) {
  return typeof input === 'number'
}

exports.isNumber = isNumber

/**
 * Check if an Item exists
 *
 * @param 	{Property} 	input
 * @returns {boolean}
 */
function Item(input) {
  if (input === null || input === undefined) return false
  return input.toString().trim().length >= 1
}

exports.Item = Item

/**
 * Check if an Item Contains 'thing'
 *
 * @param 	{String} 	item			Item to inspect
 * @param 	{String} 	search		string to search for
 * @returns {boolean}
 */
function Contains(item, search) {
  return (item.indexOf(search) >= 0)
}

exports.Contains = Contains
