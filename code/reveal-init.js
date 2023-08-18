/* global document, hljs, Reveal */
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";
// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: false,
  history: true,
  center: false,
  mouseWheel: true,
  plugins: [Markdown, Highlight, Notes],
  transition: "none", // none/fade/slide/convex/concave/zoom
});
// This is a focusaurus customization.
// Want many elements to be fragments.
function fragment(element) {
  element.classList.add("fragment");
}
// eslint-disable-next-line prefer-destructuring
const $ = document.querySelectorAll.bind(document);
const { forEach } = Array.prototype;
Reveal.addEventListener("ready", () => {
  forEach.call($("figure"), fragment);
  forEach.call($("li"), fragment);
  forEach.call($("p"), fragment);
  forEach.call($("h2"), fragment);
  forEach.call($("h3"), fragment);
  forEach.call($("h4"), fragment);
  forEach.call($("h5"), fragment);
  forEach.call($("h6"), fragment);
  const codes = document.querySelectorAll("pre > code");
  forEach.call(codes, code => {
    code.parentElement.classList.add("fragment");
  });
  forEach.call($("a"), link => {
    link.target = "_blank";
  });
});
