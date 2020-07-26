/**
 * Combines a array into a string, pre and post chars can be defined
 *
 * @param 	{Array} 	array		  Items to be combined
 * @param 	{String} 	pre		    string pre char
 * @param 	{String} 	post		  string post char
 * @param 	{Int} 	  maxLength max length of string before inserting the maxInsert
 * @param 	{String}  maxInsert insert char at the max length break
 * @return  {string}
 */
function Combine(array, pre='[ ', post=' ]', maxLength = -1, maxInsert = '\n') {
  let temp = array.join(', ')

  if (array.length < 1) return pre.trim() + post.trim()
  if (maxLength < 0) return pre + temp + post

  const maxBreaks = Math.abs(temp.length / maxLength)

  let stringRenderRows = []
  for (let idx = 0; idx < maxBreaks; idx++) {
    let start = Math.abs(idx * maxLength)
    let end = Math.abs((idx + 1) * maxLength)
    let endLineChar = '\n' + maxInsert
    if (end > temp.length) {
      end = temp.length
      endLineChar = ''
    }
    stringRenderRows.push(temp.substring(start, end) + endLineChar)
  }

  return pre + stringRenderRows.join('') + post
}

module.exports = Combine
