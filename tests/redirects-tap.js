const fs = require("fs");
const tap = require("tap");
const { request, testRedirects } = require("./utils");

function setup() {
  // eslint-disable-next-line no-sync
  const redirects = fs.readFileSync(
    `${__dirname}/../static/_redirects`,
    "utf-8"
  );
  redirects.split("\n").forEach(line => {
    if (line.startsWith("#")) {
      return;
    }
    const [from, to] = line.split(/\s/);
    tap.test(`RSS redirect ${from} to ${to}`, async () => {
      (await request())
        .get(from)
        .expect(301)
        .expect("location", to);
    });
  });
}

if (testRedirects) {
  setup();
}
