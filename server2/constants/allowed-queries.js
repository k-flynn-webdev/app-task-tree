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

const QUERIES = [
  'id',
  'owner',
  'project',
  'plan',
  'task',
  ...SPECIALS
]

module.exports = QUERIES
