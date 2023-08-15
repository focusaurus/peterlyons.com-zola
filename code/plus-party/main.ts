// import plusParty from "./plus-party";
console.log("plus-party/main.ts running");
const textArea: HTMLTextAreaElement | null = document.querySelector(
  ".plus-party textarea",
);
if (textArea) {
  textArea.select();
}
