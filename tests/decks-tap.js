"use strict";
const { getUri, testResponses } = require("./utils");
const request = require("supertest");
const tap = require("tap");

const decks = {
  "npm-gold": "Nice Pretty Modules",
  "rapid-feedback": "Rapid Feedback Learning Tools",
  "rust-at-recurse": "Learning Rust at Recurse Center",
  "twelve-factor-nodejs": "Twelve-Factor Apps in node.js",
  "web-data": "How Data Powers the Web",
  "web-prog": "Web Programming Concepts for Non-Programmers",
  "white-glove": "Finding Inconsistencies in Your MongoDB Data"
};

let uri;

tap.beforeEach(async () => {
  uri = await getUri();
});

Object.keys(decks).forEach(deck => {
  tap.test(`deck: ${deck}`, test => {
    request(uri)
      .get(`/${deck}`)
      .expect(200)
      .expect(/reveal\.js/)
      .expect(/---/)
      .expect(/highlight/)
      .end((error, res) => {
        test.error(error);
        test.match(res.text, decks[deck]); // title
        test.end();
      });
  });
});
