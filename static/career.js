/* global document */
function nodeListEach(nodeList, fn) {
  Array.prototype.forEach.call(nodeList, fn);
}

function expand(event) {
  event.preventDefault();
  const blockquote = event.target.parentElement;
  const body = blockquote.querySelector(".testimonial-body");
  body.classList.toggle("expanded");
  nodeListEach(blockquote.querySelectorAll("button"), element => {
    element.classList.toggle("hidden");
  });
}

function init() {
  const expandControls = document.querySelectorAll(".expand-control");
  nodeListEach(expandControls, element => {
    element.addEventListener("click", expand);
  });
}

init();
