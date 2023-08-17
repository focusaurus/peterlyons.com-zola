import fs from "fs";
import tap from "tap";
import { request, testRedirects } from "./utils.js";

function setup() {
  // eslint-disable-next-line no-sync
  const redirects = fs.readFileSync(
    `static/_redirects`,
    "utf-8"
  );
  console.log("setup running");
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
console.log("redirects", testRedirects);
if (testRedirects) {
  setup();
}
