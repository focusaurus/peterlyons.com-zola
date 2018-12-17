// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: false,
  history: true,
  center: false,
  mouseWheel: true,

  transition: "none", // none/fade/slide/convex/concave/zoom

  // Optional reveal.js plugins
  dependencies: [
    {
      src: "/reveal.js/plugin/markdown/marked.js",
      condition: function() {
        return !!document.querySelector("[data-markdown]");
      }
    },
    {
      src: "/reveal.js/plugin/markdown/markdown.js",
      condition: function() {
        return !!document.querySelector("[data-markdown]");
      }
    },
    {
      src: "/reveal.js/plugin/highlight/highlight.js",
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    },
    { src: "/reveal.js/plugin/notes/notes.js", async: true }
  ]
});
// This is a focusaurus customization.
// Want many elements to be fragments.
function fragment(element) {
  element.classList.add("fragment");
}
const $ = document.querySelectorAll.bind(document);
const forEach = Array.prototype.forEach;
Reveal.addEventListener("ready", function onReady(event) {
  forEach.call($("figure"), fragment);
  forEach.call($("li"), fragment);
  forEach.call($("p"), fragment);
  forEach.call($("h2"), fragment);
  forEach.call($("h3"), fragment);
  forEach.call($("h4"), fragment);
  forEach.call($("h5"), fragment);
  forEach.call($("h6"), fragment);
  const codes = document.querySelectorAll("pre > code");
  for (let i = 0; i < codes.length; i++) {
    codes[i].parentElement.classList.add("fragment");
  }
  forEach.call($("a"), function(link) {
    link.target = "_blank";
  });
});
