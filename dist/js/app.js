const header = document.querySelector("header");
const sectionTops = document.querySelectorAll(".section-top");

window.addEventListener("load", function () {
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
      },
      false
    );
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
    document.addEventListener("click", (e) => {
      let target = e.target;
      if (
        !target.classList.contains("header__nav") &&
        !target.classList.contains("header__burger")
      ) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }

  function addPadTop(headerEl, sections) {
    if (!headerEl || !sections?.length) return;
    const headerHeight = headerEl.offsetHeight;
    sections.forEach((section) => {
      section.style.marginTop = `${headerHeight}px`;
    });
  }

  if (sectionTops && header) {
    addPadTop(header, sectionTops);
  }

  function handleScroll() {
    let scroll = window.scrollY;
    if (scroll > 50) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  }

  handleScroll();

  // ====== Lenis ======

  const lenis = new Lenis({
    autoRaf: true,
  });

  window.lenis = lenis;

  // ====== Size / Multiplier ======

  function getWidthMultiplier() {
    const w = window.innerWidth;

    if (w <= 767) {
      return Math.min(window.innerWidth, window.innerHeight) / 375;
    }

    if (w <= 1024) {
      return Math.min(window.innerWidth, window.innerHeight) / 768;
    }

    return window.innerWidth / 1920;
  }

  let _multiplier = getWidthMultiplier();

  function s(value) {
    return value * _multiplier;
  }

  // ====== Swiper ======
  var heroSwiper = new Swiper(".heroSwiper", {
    effect: "fade",
    navigation: {
      nextEl: ".hero-next",
      prevEl: ".hero-prev",
    },
  });

  var newsSwiper = new Swiper(".newsSwiper", {
    slidesPerView: 1,
    spaceBetween: s(16),
    pagination: {
      el: ".news-pagination",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: s(20),
      },
    },
  });

  var otherSwiper = new Swiper(".otherSwiper", {
    slidesPerView: 1,
    spaceBetween: s(16),
    pagination: {
      el: ".other-pagination",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: s(20),
      },
    },
  });

  var otherSwiper2 = new Swiper(".otherSwiper2", {
    slidesPerView: 1,
    spaceBetween: s(16),
    pagination: {
      el: ".other-pagination-2",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: s(20),
      },
    },
  });

  var productSwiper = new Swiper(".productSwiper", {
    spaceBetween: s(8),
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var productSwiper2 = new Swiper(".productSwiper2", {
    spaceBetween: s(8),
    thumbs: {
      swiper: productSwiper,
    },
  });

  // ====== Resize ======

  window.addEventListener("resize", () => {
    if (sectionTops && header) {
      addPadTop(header, sectionTops);
    }
  });

  // ====== Scroll ======

  window.addEventListener('scroll', function() {
    handleScroll();
  });

  var tabs = new Tabby('[data-tabs]');
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".js-catalog-trigger");
  const mega = document.querySelector(".js-mega");
  if (!trigger || !mega) return;

  const tabs = mega.querySelectorAll(".mega__tab");
  const panels = mega.querySelectorAll(".mega__panel");

  const open = () => {
    mega.classList.add("open");
    mega.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    mega.classList.remove("open");
    mega.setAttribute("aria-hidden", "true");
  };

  // const parentLi = trigger.closest("li");
  // if (parentLi) {
  //   parentLi.addEventListener("mouseenter", () => open());
  //   parentLi.addEventListener("mouseleave", () => close());
  // }

  const wrapper = trigger.closest(".header__catalog-item");

  if (wrapper && window.matchMedia("(min-width: 1025px)").matches) {
    wrapper.addEventListener("mouseenter", open);
    wrapper.addEventListener("mouseleave", close);
  }

  // Закрытие по клику вне меню (работает и на десктопе, и на мобиле)
  document.addEventListener("click", (e) => {
    if (!mega.classList.contains("open")) return;
    if (!wrapper) return;
    if (!wrapper.contains(e.target)) close();
  });

  trigger.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      e.preventDefault();
      mega.classList.contains("open") ? close() : open();
    }
  });

  const setTab = (name) => {
    tabs.forEach((b) => b.classList.toggle("is-active", b.dataset.tab === name));
    panels.forEach((p) =>
      p.classList.toggle("is-active", p.dataset.panel === name)
    );
  };

  tabs.forEach((btn) => {
    btn.addEventListener("mouseenter", () => setTab(btn.dataset.tab));
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});

