const SPECIALS = [
  '$limit',
  '$skip',
  '$sort',
  '$select',
  '$in',
  '$nin',
  '$lt',
  '$lte',
  '$gt',
  '$gte',
  '$ne',
  '$or',
  'showAll'
]

const DATA = [
  'id',
  'role',
  'owner',
  'project',
  'plan',
  'task',
  'value',
  'is_done',
  'total',
  'progress',
  'email'
]

/**
 * All allowed properties/keys
 *
 * @type {string[]}
 */
const ALL = [
  ...DATA,
  ...SPECIALS
]

module.exports = ALL
