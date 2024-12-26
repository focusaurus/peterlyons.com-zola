import { testUri } from "./utils.js";

testUri("/", {
  match: [
    "node.js",
    "Pragmatism on tap",
    "Creative Commons",
    "Projects",
  ],
  selectors: [
    "section.intro",
    "header h1",
    "body .content",
    "nav.site",
    ".license",
  ],
});
testUri("/career/", { match: ["Opsware"] });
testUri("/code-conventions/", { match: ["readability"] });
testUri("/contact/", { match: ["pete@peterlyons.com"] });
testUri("/js-debug/", { match: [".stepSync"] });
testUri("/leveling-up/", { match: ["Pillar 1"] });
testUri("/npm-gold/", { match: ["---", "Nice Pretty Modules"] });
testUri("/plus-party/", {
  match: ["Plus Party"],
  selectors: [
    "iframe[allowfullscreen]",
    'img[alt="One plus two plus two plus one."]',
  ],
});
testUri("/practices/", { match: ["Craftsmanship"] });
testUri("/rapid-feedback/", { match: ["Rapid Feedback Learning Tools"] });
testUri("/rust-at-recurse/", { match: ["Learning Rust at Recurse Center"] });
testUri("/talks/", { match: ["Speaking"] });
testUri("/twelve-factor-nodejs/", {
  match: ["---", "Twelve-Factor Apps in node.js"],
});
testUri("/web-data/", { match: ["---", "How Data Powers the Web"] });
testUri("/web-prog/", {
  match: [
    "---",
    "/web-prog/web-prog.md.deck",
    "Web Programming Concepts for Non-Programmers",
  ],
});
testUri("/white-glove/", { match: ["---", "Finding Inconsistencies"] });
testUri("/screen.css", { match: ["font-family", "Noto Serif", "Inconsolata"] });
testUri("/deck.css", { match: ["background-color"] });
testUri("/favicon.ico");
testUri("/favicon.png");
testUri("/humans.txt", { match: ["Netlify"] });
testUri("/rss.xml", { match: ["Pete&#x27;s Points"] });
