/**
 * Combines a array into a string, pre and post chars can be defined
 *
 * @param 	{Array} 	array		Items to be combined
 * @param 	{String} 	pre		  string pre char
 * @param 	{String} 	post		string post char
 * @return  {string}
 */
function Combine(array, pre='[ ', post=' ]') {
  let temp = array.join(', ')

  if (array.length < 1) {
    return pre.trim() + post.trim()
  }

  return pre + temp + post
}

module.exports = Combine
