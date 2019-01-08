"use strict";
const { promisify } = require("util");
const cheerio = require("cheerio");
const handler = require("serve-handler");
const http = require("http");
const supertest = require("supertest");
const tap = require("tap");

const uri = process.env.URI;
function isValidUri(value) {
  return /^https?:\/\//.test(value);
}

const testRedirects = isValidUri(uri);
let server;
tap.tearDown(() => server && server.close());

function _uri(_server) {
  return `http://localhost:${_server.address().port}`;
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
  /* istanbul ignore if */
  if (isValidUri(uri)) {
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

async function request() {
  const baseUri = await getUri();
  return supertest(baseUri);
}

async function testUri(
  uriPath,
  { description = "", selectors = [], match = [], code = 200 } = {}
) {
  tap.test(description || uriPath, async test => {
    const req = await request();
    const res = await req.get(uriPath).expect(code);
    if (res.headers["content-type"].includes("text/html")) {
      const $ = cheerio.load(res.text);
      selectors.forEach(selector => {
        test.ok(
          $(selector).length > 0,
          `Path ${uriPath} missing selector ${selector}`
        );
      });
    }

    match.forEach(_match => {
      test.match(res.text, _match);
    });
  });
}

module.exports = { testUri, request, testRedirects };
