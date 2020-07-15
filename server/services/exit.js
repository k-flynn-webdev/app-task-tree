/**
 *
 * @param res
 * @param status
 * @param message
 * @param data
 * @param notify		A notify message to leave the user
 */

// todo in future add pagination data obj here ..

function Exit(res, status, message, data, notify ) {

  let tmpMsg = {
    status: message.status || status,
    message: message.message || message
  }

  if (tmpMsg.status < 400) tmpMsg.data = data
  if (notify) tmpMsg.notify = notify

  return res.status(tmpMsg.status).json(tmpMsg)
}

module.exports = Exit
