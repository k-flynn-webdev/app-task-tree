/**
 * Returns a object value/item from a SQL packet/query
 *
 * @param {object}  rowPacket
 * @param {int}     index
 * @returns {object/item}
 */
function MYSQLValue(rowPacket, index = 0) {
  return Object.values(rowPacket)[index]
}

module.exports = MYSQLValue

