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
  '$or'
]

const DATA = [
  'id',
  'owner',
  'project',
  'plan',
  'task',
  'value',
  'is_done',
  'total',
  'progress'
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
