/* ===== Animasi teks TK St. Dominikus ===== */
(function () {
  "use strict";

  function initPageAnimations() {
    const main = document.querySelector("main");
    if (!main) return;

    // Animasi masuk untuk tulisan utama pada setiap halaman.
    const textSelectors = "h1, h2, h3, h4, h5, h6, p, li, blockquote, label";
    const textItems = Array.from(main.querySelectorAll(textSelectors)).filter(function (el) {
      return el.textContent.trim().length > 0;
    });

    textItems.forEach(function (el, index) {
      if (el.closest("script, style, noscript")) return;
      el.classList.add("page-text-animate");
      // Stagger kecil agar tulisan muncul berurutan, tetapi tidak terlalu lambat.
      const delay = Math.min((index % 8) * 70, 490);
      el.style.transitionDelay = delay + "ms";
    });

    // Animasi kartu/section konten yang mempunyai bayangan atau border.
    const cards = Array.from(main.querySelectorAll(".shadow, .shadow-sm, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl"))
      .filter(function (el) {
        return el.children.length > 0 && !el.classList.contains("page-text-animate");
      });

    cards.forEach(function (el, index) {
      // Jangan mengubah animasi elemen yang sudah memiliki animasi Tailwind.
      if (!el.dataset.pageAnimation) {
        el.classList.add("page-card-animate");
        el.dataset.pageAnimation = "1";
        el.style.transitionDelay = Math.min((index % 5) * 80, 320) + "ms";
      }
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      textItems.forEach(function (el) { el.classList.add("is-visible"); });
      cards.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    main.querySelectorAll(".page-text-animate, .page-card-animate").forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageAnimations);
  } else {
    initPageAnimations();
  }
})();
