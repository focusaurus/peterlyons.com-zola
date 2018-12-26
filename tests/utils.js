"use strict";
const { promisify } = require("util");
const handler = require("serve-handler");
const http = require("http");
const supertest = require("supertest");
const tap = require("tap");

let server;

function _uri(server) {
  return `http://localhost:${server.address().port}`;
}

/**
 * This file works in 2 modes.
 * For unit tests, it starts a local server on a free port
 * and returns the URI for testing. The server gets stopped at the end of the
 * test suite.
 *
 * For integration testing a running instance
 * (could be local, stage, production), set the environment variable URI
 * to the base URI the tests should hit, and that will be used instead.
 */
async function getUri() {
  const uri = process.env.URI;
  /* istanbul ignore if */
  if (/^https?:\/\//.test(uri)) {
    return uri;
  }
  if (server) {
    return _uri(server);
  }
  process.chdir(`${__dirname}/../public`);
  server = http.createServer(handler);
  const listen = promisify(server.listen.bind(server));
  await listen();
  return _uri(server);
}

tap.tearDown(async () => {
  (await server) && server.close();
});

function testResponses(description, baseUri, pairs) {
  const request = supertest(baseUri);
  pairs.forEach(([uri, regex]) => {
    tap.test(`${description} smoke test ${uri}`, test => {
      request
        .get(uri)
        .expect(regex)
        .expect(200)
        .end(error => {
          test.error(error);
          test.end();
        });
    });
  });
}
module.exports = { getUri, testResponses };
// if (require.main === module) {
//   getUri().then(console.log);
// }
