"use strict";
const { promisify } = require("util");
const handler = require("serve-handler");
const http = require("http");

async function start(port) {
  process.chdir(`${__dirname}/../public`);
  const server = http.createServer(handler);
  const listen = promisify(server.listen.bind(server));
  await listen(port);
  // eslint-disable-next-line no-console
  console.log("HTTP server running on port", port);
  return server;
}

if (require.main === module) {
  start(Number(process.env.PORT));
}
