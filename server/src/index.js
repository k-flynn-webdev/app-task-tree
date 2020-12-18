/* eslint-disable no-console */
// const logger = require('./logger');
const app = require('./app');
const host = app.get('host');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  app.log.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  app.log(`Feathers application started on http://${host}:${port}`)
);
