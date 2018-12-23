const HEADER_SELECTOR = ".intro .highlight";
let subtitle;
/* global document */

function speed() {
  return Math.random() * 200 + 20;
}

function pushLetter() {
  const header = document.querySelector(HEADER_SELECTOR);
  const text = header.textContent;
  if (text.length === subtitle.length) {
    return;
  }
  header.textContent = text + subtitle[text.length];
  setTimeout(pushLetter, speed());
}

export default function start() {
  const header = document.querySelector(HEADER_SELECTOR);
  subtitle = header.textContent;
  header.textContent = "";
  setTimeout(pushLetter, speed());
}
