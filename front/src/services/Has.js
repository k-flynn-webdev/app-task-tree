/**
 * Check if an hasAnItem has a uppercase letter present
 *
 * @param   {String} input
 * @returns {boolean}
 */
function HasUpperCase (input) {
  const tmpNoNumber = input.replace(/[^A-Za-z]/g, '')
  const upperTmp = tmpNoNumber.toLocaleUpperCase()
  for (let i = 0; i < tmpNoNumber.length; i++) {
    if (tmpNoNumber.charAt(i) === upperTmp.charAt(i)) return true
  }

  return false
}

exports.HasUpperCase = HasUpperCase

/**
 * Returns all numeric from a string
 *
 * @param   {String} input
 * @returns {boolean}
 */
function HasNumbers (input) {
  const strip = input.replace(/\D/g, '')
  return (strip.length > 0)
}

exports.HasNumbers = HasNumbers

/**
 * Returns if is numeric
 *
 * @param   {number}    input
 * @returns {boolean}
 */
function isANumber (input) {
  return typeof Number(input) === 'number'
}

exports.isANumber = isANumber

/**
 * Check if a item exists
 *
 * @param   {Property}  input
 * @returns {boolean}
 */
function hasAnItem (input) {
  if (input === null || input === undefined) return false
  return input.toString().trim().length >= 1
}

exports.hasAnItem = hasAnItem

/**
 * Check if an string Contains 'search'
 *
 * @param {String}  text    hasAnItem to inspect
 * @param {String}  search  string to search for
 * @returns {boolean}
 */
function StringContains (text, search) {
  return (text.indexOf(search) >= 0)
}

exports.StringContains = StringContains
