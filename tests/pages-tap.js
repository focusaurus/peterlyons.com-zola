"use strict";
const { getUri, testResponses } = require("./utils");
const request = require("supertest");
const tap = require("tap");

let uri;

tap.beforeEach(async () => {
  uri = await getUri();
});

const pathExps = [
  ["/", /node\.js/],
  ["/career", /Opsware/],
  ["/code-conventions", /readability/],
  ["/contact", /pete@peterlyons.com/],
  ["/leveling-up", /Pillar 1/],
  ["/plus-party", /Plus Party/],
  ["/practices", /Craftsmanship/],
  ["/stacks", /JavaScript/],
  ["/talks", /Speaking/],
  ["/twelve-factor-nodejs", /Twelve-Factor/],
  ["/web-prog", /\/decks\/web-prog\.md/]
];

tap.test("pages smoke tests", test => {
  testResponses("Pages (pug templates)", uri, pathExps);
  test.end();
});

tap.test("home page", test => {
  request(uri)
    .get("/")
    .expect(200)
    .expect(/Cyber Lumberjack/)
    .expect(/Stacks/)
    .expect(/Creative Commons/)
    .expect(/<section .*class="intro"/i)
    .end(error => {
      test.error(error);
      test.end();
    });
});
