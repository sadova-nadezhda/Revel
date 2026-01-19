const header = document.querySelector("header");
const sectionTop = document.querySelector(".section-top");

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

  function addPadTop(headerEl, section) {
    if (!headerEl || !section) return;
    const headerHeight = headerEl.offsetHeight;
    section.style.marginTop = `${headerHeight}px`;
  }

  if (sectionTop && header) {
    addPadTop(header, sectionTop);
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
    if (sectionTop && header) {
      addPadTop(header, sectionTop);
    }
  });

  // ====== Scroll ======

  window.addEventListener('scroll', function() {
    handleScroll();
  });

  var tabs = new Tabby('[data-tabs]');
});
