/**
 *
 * @param res
 * @param status
 * @param message
 * @param data
 * @param notify		A notify message to leave the user
 */

// todo in future add pagination data obj here ..

function Exit(res, status, message, data= {}, notify) {
  
  return res.status(status).json({
    status: status,
    message: message,
    data: data,
    notify: notify
  })
}

module.exports = Exit
