/* global document */
const nav = document.querySelector("nav.site");
const content = document.querySelector(".content");

function toggleNav() {
  nav.classList.toggle("open");
  content.classList.toggle("navOpen");
}

function closeNav(event) {
  if (event.target.classList.contains("navMenuButton")) {
    // this is the click of the nav menu button to open it.
    // Disregard.
    return;
  }
  nav.classList.remove("open");
  content.classList.remove("navOpen");
}

export default function start() {
  document.querySelector(".navMenuButton").addEventListener("click", toggleNav);
  document.querySelector("nav.site .close").addEventListener("click", closeNav);
  document.addEventListener("click", closeNav);

  let path = document.location.pathname;
  const problog = "/problog/";
  if (path.startsWith(problog)) {
    path = path.substring(0, problog.length);
  }
  const selector = `nav a[href='${path}']`;
  const navEls = document.querySelectorAll(selector);
  Array.prototype.forEach.call(navEls, (el) => {
    el.classList.add("current");
  });
}
