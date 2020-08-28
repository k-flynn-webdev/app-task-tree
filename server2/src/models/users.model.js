/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'users';

  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        !table.increments('id').notNullable();

        table.string('role').defaultTo('user').notNullable();

        table.string('email').unique().notNullable();
        table.string('password').notNullable();

        table.string('verify');
        table.string('recover');

        table.timestamp('created_at').defaultTo(db.fn.now()).notNullable();
        table.timestamp('updated_at').defaultTo(db.fn.now()).notNullable();

      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
