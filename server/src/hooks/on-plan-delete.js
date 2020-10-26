// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = context => {
  if (context && !context.id) return context

  const constants = context.app.get('constants')

  context.app.service(constants.path.task)
    ._remove(null, { query: { plan: context.id } })

  return context
}
