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
  'is_done',
  'id',
  'owner',
  'project',
  'plan',
  'task',
  'value'
]

const ALL = [
  ...DATA,
  ...SPECIALS
]

module.exports = ALL
