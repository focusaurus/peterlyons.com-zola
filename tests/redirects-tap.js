const { request, testRedirects } = require("./utils");
const fs = require("fs");
const util = require("util");

const read = util.promisify(fs.readFileSync);
async function setup() {
  const redirects = await read(`${__dirname}/../static/_redirects`);
  redirects.split("\n").forEach(line => {
    if (line.startsWith("#")) {
      return;
    }
    const [from, to] = line.split(/\s/);
    tap.test(`RSS redirect ${from} to ${to}`, async test => {
      await request()
        .get(from)
        .expect(301)
        .expect("location", to);
    });
  });
}

if (testRedirects) {
  setup();
}
