
exports.up = function(knex) {
  return knex.schema.table('task', function(table) {
    table.integer('is_done').notNullable().alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('task', function(t) {
    t.boolean('is_done');
  });
};
