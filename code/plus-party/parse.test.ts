import tap from "tap";
import p from "./parse.js";

tap.test("parseNumbers", (t: Tap.Test) => {
  t.same(p(""), [], "empty string");
  t.same(p("1 2 3 4"), [1, 2, 3, 4], "Basic integers");
  t.same(p("-7 -3"), [-7, -3], "negative integers");
  t.same(p("no numbers in here"), [], "no numbers");
  t.same(p(","), [], "no commas");
  t.same(p("words, and, commas, don't, count,"), [], "disregard commas");
  t.same(p("word 42, hey $14.42 on 02/14/2019"), [42, 14.42], "base");
  t.same(p("1/1/2020"), [], "ignore date m/d/yyyy");
  t.same(p("Party 10/31/1984"), [], "ignore date mm/dd/yyyy");
  t.same(p("Party 10/31/1984\nword 1/1/1234 disco"), [], "ignore dates");
  t.same(p("1.2.3"), [], "only one decimal point per number");
  t.same(p("1 - 2"), [1, 2], "What do you think this is? A subtraction party?");
  t.same(p("Big numbers 4,321,000.42"), [4321000.42], "formatted with commas");
  t.same(p("Small numbers -4,321,000.42"), [-4321000.42], "negative with commas");
  t.end();
});
