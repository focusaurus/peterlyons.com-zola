const commaRegex = /,/g;
const dateRegex = /\b\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})\b/g;
const doubleDecimal = /\b.+\..*\..*\b/g;
const numberRegex = /-?(?:\d+)(?:\.\d+)?\b/g;

function parseNumbers(rawText: string) {
  let parsed = rawText
    .replace(dateRegex, "")
    .replace(commaRegex, "")
    .replace(doubleDecimal, "");
  const result: number[] = [];
  const matches = parsed.match(numberRegex);
  if (matches == null) {
    return result;
  }
  for (const match of matches) {
    const num = Number(match);
    if (Number.isNaN(num)) {
      continue;
    }
    result.push(num);
  }
  return result;
}

module.exports = { parseNumbers };
/*
numberRe =
        Regex.fromString "\\b-?(\\d{1,3}(,\\d{3})*|\\d+)(\\.\\d+)?\\b"
*/
