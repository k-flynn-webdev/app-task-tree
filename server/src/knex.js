const knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('mysql');
  const db = knex({ client, connection });

  // Create the schema
  db.schema.createSchemaIfNotExists(connection.database);
  // todo cant figure out how to auto create a db if missing?

  app.set('knexClient', db);
};
