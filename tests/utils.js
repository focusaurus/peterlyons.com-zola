"use strict";
const { promisify } = require("util");
const cheerio = require("cheerio");
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

tap.tearDown(() => {
  server && server.close();
});

async function testUri(
  uriPath,
  { description = "", selectors = [], match = [], code = 200 } = {}
) {
  tap.test(description || uriPath, async test => {
    const baseUri = await getUri();
    const request = supertest(baseUri);
    const res = await request.get(uriPath).expect(code);
    if (res.headers["content-type"].includes("text/html")) {
      const $ = cheerio.load(res.text);
      selectors.forEach(selector => {
        test.ok(
          $(selector).length > 0,
          `Path ${uriPath} missing selector ${selector}`
        );
      });
    }

    match.forEach(match => {
      test.match(res.text, match);
    });
  });
}

module.exports = { testUri };
