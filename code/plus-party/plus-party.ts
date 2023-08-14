const commaRegex = /,/g;
const dateRegex = /\b\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})\b/g;
const doubleDecimal = /\b.+\..*\..*\b/g;
const numberRegex = /-?(?:\d+)(?:\.\d+)?\b/g;

function parseNumbers(rawText) {
  let parsed = rawText
    .replaceAll(dateRegex, "")
    .replaceAll(commaRegex, "")
    .replaceAll(doubleDecimal, "");
  const result = [];
  for (const match of parsed.matchAll(numberRegex)) {
    const num = Number(match[0]);
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
