const tap = require("tap");
const plusParty = require("./plus-party.ts");

tap.equal("Party 10/31/1984".replaceAll(plusParty.dateRegex, ""), "Party ");
