const knex = require('knex');

module.exports = function (app) {
  const { client, connection } = app.get('mysql');
  const db = knex({ client, connection });

  app.set('knexClient', db);
};



// client: 'mysql',
//   connection: {
//   host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'your_database_password',
//     database: 'myapp_test'
// },
// pool: { min: 0, max: 7 }
