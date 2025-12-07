+++
title = "AWS Lambda Object Mother"
date = 2017-04-24T20:41:40.712Z
+++
I've been coding a project build on AWS Lambda and I wanted to post a unit testing pattern that has been really helpful especially for input validation. The lambda function input starts with an "event" object which I'm sure in the first version of lambda was reasonably small and simple, but now it can get quite complex with many deeply nested properties when API Gateway authorizers and path parameters are involved. Thus I've been applying the "Object Mother" test pattern to create event objects I can pass to my lambda handler functions during unit testing.

Here's a few key points before the code excerpt.

1. My helper function by default will return a complete and valid event object. This is convenient, but it's also important to prove that if I alter only 1 property and the event is considered invalid, I know the property I altered did in fact cause the invalid state, and not some other missing or invalid property.
1. I use the `dot2val` module to allow me to consisely express a deeply nested value I want to override. I can also easily null out a nested value in the middle of the object structure with this technique.
1. When integrated with API Gateway the `event.body` property will unfortunately be an unparsed JSON string literal. Once this is stringified, it's a pain to modify. The pattern I have here allows tweaking of the body object before it gets stringified, which is nice.

Here's what it ends up looking like.

```js
const dot2val = require("dot2val");
const myLambdaHandler = require("./my-lambda").handler;
const schemas = require("../schemas");
const tap = require("tap");

function mockEvent(path, value) {
  // First, construct a fully valid mock object
  const event = {
    pathParameters: {
      sort: "asc"
    },
    body: {
      email: schemas.email.example,
      firstName: schemas.name.example,
      lastName: schemas.name.example
    },
    requestContext: {
      authorizer: {
        id: "42"
      }
    }
  };
  // If any values need to change, override them here
  if (path) {
    dot2val.set(event, path, value);
  }
  // Make body into a JSON string to match lambda environment
  event.body = JSON.stringify(event.body);
  return event;
}

const invalids = [
  ["body.email", "@jdoe"],
  ["body.email", "no at here"],
  ["body.email", false],
  ["body.email", null],
  ["body.email", undefined],
  ["body.firstName", "a".repeat(51)],
  ["body.firstName", 0],
  ["body.firstName", false],
  ["body.firstName", null],
  ["body.firstName", undefined],
  ["body.lastName", "a".repeat(51)],
  ["body.lastName", 0],
  ["body.lastName", false],
  ["body.lastName", null],
  ["body.lastName", undefined],
  ["body", undefined],
  ["pathParameters.sort", 0],
  ["pathParameters.sort", false],
  ["pathParameters.sort", null],
  ["pathParameters", undefined]
];

invalids.forEach(pair => {
  tap.test(`createUser validates ${pair[0]}`, {skip: false}, test => {
    const event = mockEvent(pair[0], pair[1]);
    myLambdaHandler(event, {}, (error, res) => {
      tap.error(error, "should succeed without error");
      tap.same(res.statusCode, 400, "should send 400 status");
      test.end();
    });
  });
});
```

So the pattern I use is:

1. Set up my object mother function, which here I name `mockEvent`
2. Create a list of invalid properties which pairs their object dot notation path string and the value. This is a pretty consice way to test a lot of cases.
3. A tiny bit of metaprogramming if you will creates a tap unit test for each invalid property without repetition of the test code itself.
