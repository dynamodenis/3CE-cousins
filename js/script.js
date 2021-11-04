// Copyright year
(() => {
  const copyrightYearEl = document.querySelector(".footer__copyright--year");
  copyrightYearEl.textContent = new Date().getFullYear();
})();

// Smooth scrolling
(() => {
  const headerEl = document.querySelector(".header");
  const allLinks = document.querySelectorAll("a:link");
  allLinks.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Scroll back to top
      if (href === "#")
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      // Scroll to other links
      if (href != "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation
      if (link.classList.contains("main-nav__link")) {
        headerEl.classList.toggle("nav-open");
      }
    })
  );
})();

// Navigation
(() => {
  const headerEl = document.querySelector(".header");
  const btnNavEl = document.querySelector(".btn--mobile-nav");
  btnNavEl.addEventListener("click", () => {
    headerEl.classList.toggle("nav-open");
  });
})();

// Flexing gap property flexbox
(() => {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  if (!isSupported) document.body.classList.add("no-flexbox-gap");
})();
