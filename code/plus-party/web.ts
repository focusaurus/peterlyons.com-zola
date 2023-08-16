import parse from "./parse.js";
import ClipboardJS from "clipboard";


function selectDOM(selector: string): HTMLElement | null {
  return document.querySelector(".plus-party " + selector);
}

function numberToItem(number: number) {
  return `<li>${number}</li>`;
}

function sum(numbers: number[]) {
  return numbers.reduce((a, v) => a + v);
}

function render(numbers: number[]) {
  const ul: HTMLElement | null = selectDOM("ul");
  if (ul) {
    ul.innerHTML = numbers.map(numberToItem).join("\n");
  }
  const total = selectDOM(".total");
  if (total) {
    total.innerHTML = String(sum(numbers));
  }
}

function main() {
  const textArea = selectDOM("textarea");
  if (!(textArea instanceof HTMLTextAreaElement)) {
    return;
  }
  textArea.select();
  textArea.addEventListener("input", (e) => {
    const numbers = parse(textArea.value);
    // console.log(numbers);
    render(numbers);
    return true;
  });
  const copyButton = selectDOM("#copy-total");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      copyButton.innerHTML = "Copied!";
      setTimeout(() => {
        copyButton.innerHTML = "Copy Total 📋";
      }, 2000);
    });
  }
  new ClipboardJS("#copy-total"); // eslint-disable-line no-new
}

main();
