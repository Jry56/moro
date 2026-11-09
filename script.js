const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
const menu = $(".menu"),
  mobile = $(".mobile-menu"),
  search = $(".search"),
  panel = $(".search-panel"),
  close = $(".close");
menu.onclick = () => mobile.classList.toggle("open");
$$(".mobile-menu a").forEach(
  (a) => (a.onclick = () => mobile.classList.remove("open")),
);
function openSearch() {
  panel.classList.add("open");
  panel.querySelector("input").focus();
}
search.onclick = openSearch;
close.onclick = () => panel.classList.remove("open");
addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    openSearch();
  }
  if (e.key === "Escape") panel.classList.remove("open");
});
const sections = [...$$("main section[id]")],
  links = [...$$("nav a")],
  steps = [...$$(".timeline button")];
new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        let id = e.target.id;
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + id),
        );
        steps.forEach((s) =>
          s.classList.toggle("active", s.dataset.target === id),
        );
      }
    }),
  { rootMargin: "-42% 0px -48% 0px" },
).observe;
const obs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
sections.forEach(
  (s) =>
    s.id &&
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            let id = e.target.id;
            links.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === "#" + id),
            );
            steps.forEach((x) =>
              x.classList.toggle("active", x.dataset.target === id),
            );
          }
        }),
      { rootMargin: "-42% 0px -48% 0px" },
    ).observe(s),
);
$$(".manifesto>*,.product-image,.meta,.materials>*,.closing").forEach((e) => {
  e.classList.add("reveal");
  obs.observe(e);
});
steps.forEach(
  (s) =>
    (s.onclick = () =>
      document
        .getElementById(s.dataset.target)
        .scrollIntoView({ behavior: "smooth" })),
);
const glow = $(".cursor-glow");
addEventListener("pointermove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
$$(".product-image,.pill").forEach((el) => {
  el.onpointermove = (e) => {
    let r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) / 35}px,${(e.clientY - r.top - r.height / 2) / 35}px)`;
  };
  el.onpointerleave = () => (el.style.transform = "");
});
