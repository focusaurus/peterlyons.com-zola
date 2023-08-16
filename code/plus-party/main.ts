import parse from "./parse.js";

function numberToItem(number: number) {
  return `<li>${number}</li>`;
}

function render(numbers: number[]) {
  const ul: HTMLElement | null = document.querySelector(".plus-party ul");
  if (!ul) {
    return;
  }
  ul.innerHTML = numbers.map(numberToItem).join("\n");
  const sum = numbers.reduce((a, v) => a + v);
  const total = document.querySelector(".plus-party .total");
  if (total) {
    total.innerHTML = String(sum);
  }
}

const textArea: HTMLTextAreaElement | null = document.querySelector(
  ".plus-party textarea",
);
if (textArea) {
  textArea.select();
  textArea.addEventListener("input", (e) => {
    const numbers = parse(textArea.value);
    console.log(numbers);
    render(numbers);
    return true;
  });
}
