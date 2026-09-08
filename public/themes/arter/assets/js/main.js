(async function ($) {
  ("use strict");

  initHomeBlogSlider();

  /* menu custom link */
  $(".menu-item-type-custom").each(function () {
    $(this).find("> a").attr("data-no-swup", "");
  });

  var magnificZoomCallbacks = {
    beforeOpen: function () {
      this.st.image.markup = this.st.image.markup.replace(
        "mfp-figure",
        "mfp-figure mfp-with-anim"
      );
      this.st.mainClass = "mfp-zoom-in";
    },
  };

  function bindMagnificImageLinks() {
    $("[data-magnific-image]").each(function () {
      var href = this.getAttribute("href") || "";
      var isSvg = /\.svg(\?|#|$)/i.test(href);
      if (isSvg) {
        $(this).magnificPopup({
          type: "iframe",
          closeOnContentClick: false,
          callbacks: {
            beforeOpen: function () {
              this.st.mainClass = "mfp-zoom-in mfp-svg";
            },
          },
          iframe: {
            markup:
              '<div class="mfp-iframe-scaler mfp-svg-scaler">' +
              '<div class="mfp-close"></div>' +
              '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
              "</div>",
          },
        });
      } else {
        $(this).magnificPopup({
          type: "image",
          closeOnContentClick: true,
          fixedContentPos: false,
          closeBtnInside: false,
          callbacks: magnificZoomCallbacks,
        });
      }
    });
  }

  function bindGalleryLinks($links) {
    if (!$links || !$links.length) return;
    $links.magnificPopup({
      gallery: { enabled: true },
      type: "image",
      closeOnContentClick: false,
      fixedContentPos: false,
      closeBtnInside: false,
      callbacks: magnificZoomCallbacks,
    });
  }

  function bindMagnificPopups() {
    $(".wp-block-gallery, .journey-gallery").each(function () {
      bindGalleryLinks($(this).find("a"));
    });

    bindGalleryLinks(
      $("[data-magnific-gallery]").filter(function () {
        return $(this).closest(".wp-block-gallery, .journey-gallery").length === 0;
      })
    );

    $("[data-magnific-inline]").magnificPopup({
      type: "inline",
      overflowY: "auto",
      preloader: false,
      callbacks: {
        beforeOpen: function () {
          this.st.mainClass = "mfp-zoom-in";
        },
      },
    });
    bindMagnificImageLinks();
    $("[data-magnific-video]").magnificPopup({
      type: "iframe",
      iframe: {
        patterns: {
          youtube_short: {
            index: "youtu.be/",
            id: "youtu.be/",
            src: "https://www.youtube.com/embed/%id%?autoplay=1",
          },
        },
      },
      preloader: false,
      fixedContentPos: false,
      callbacks: {
        markupParse: function (template, values, item) {
          template.find("iframe").attr("allow", "autoplay");
        },
        beforeOpen: magnificZoomCallbacks.beforeOpen,
      },
    });
    $("[data-magnific-music]").magnificPopup({
      type: "iframe",
      preloader: false,
      fixedContentPos: false,
      closeBtnInside: true,
      callbacks: magnificZoomCallbacks,
    });

    $("a").each(function (i, el) {
      if (
        el.hasAttribute("data-magnific-gallery") ||
        el.hasAttribute("data-magnific-image") ||
        el.hasAttribute("data-magnific-inline") ||
        el.hasAttribute("data-magnific-video") ||
        el.hasAttribute("data-magnific-music") ||
        $(el).closest(".wp-block-gallery, .journey-gallery").length
      ) {
        return;
      }
      if (!/\.(jpe?g|png|gif|webp)$/i.test(el.pathname || "")) return;
      $(el).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: magnificZoomCallbacks,
      });
    });
  }

  window.bindMagnificImageLinks = bindMagnificImageLinks;
  window.bindMagnificPopups = bindMagnificPopups;

  function initCounters(instant) {
    var $frames = $(".art-counter-frame");
    if (!$frames.length) return;

    if (typeof anime === "function") {
      anime({
        targets: ".art-counter-frame",
        opacity: [0, 1],
        duration: instant ? 400 : 800,
        delay: instant ? 0 : 200,
        easing: "linear",
      });
    } else {
      $frames.css("opacity", 1);
    }

    var startCount = function () {
      $(".art-counter").each(function () {
        var $el = $(this);
        var target = parseInt($el.text(), 10);
        if (isNaN(target)) return;
        $el.stop(true, true).prop("Counter", 0).text("0").animate(
          { Counter: target },
          {
            duration: 2000,
            easing: "linear",
            step: function (now) {
              $el.text(Math.ceil(now));
            },
          }
        );
      });
    };

    if (instant) {
      startCount();
      return;
    }

    if (typeof anime === "function") {
      anime({
        targets: ".art-counter",
        delay: 1300,
        opacity: [1, 1],
        complete: startCount,
      });
    } else {
      startCount();
    }
  }

  function initSkillBars() {
    var bar_delay = 100;
    $(".art-skills-progress").each(function () {
      if (this.querySelector("svg")) return;
      var bar_id = $(this).attr("id");
      var bar_val = parseInt($(this).attr("data-value"), 10) / 100;
      var bar_type = $(this).attr("data-type");
      bar_delay = bar_delay + 100;
      if (!bar_id || typeof ProgressBar === "undefined") return;

      if (bar_type == "circles") {
        var circleBar = new ProgressBar.Circle("#" + bar_id, {
          strokeWidth: 7,
          easing: "easeInOut",
          duration: 1400,
          delay: bar_delay,
          trailWidth: 7,
          step: function (state, circle) {
            var value = Math.round(circle.value() * 100);
            circle.setText(value === 0 ? "" : value);
          },
        });
        circleBar.animate(bar_val);
      }
      if (bar_type == "progress") {
        var lineBar = new ProgressBar.Line("#" + bar_id, {
          strokeWidth: 1.72,
          easing: "easeInOut",
          duration: 1400,
          delay: bar_delay,
          trailWidth: 1.72,
          svgStyle: {
            width: "100%",
            height: "100%",
          },
          step: function (state, bar) {
            bar.setText(Math.round(bar.value() * 100) + " %");
          },
        });
        lineBar.animate(bar_val);
      }
    });
  }

  window.initCounters = initCounters;
  window.initSkillBars = initSkillBars;

  if (!$("body").hasClass("default--scrolling")) {
    // scrollbar
    Scrollbar.use(OverscrollPlugin);
    if ($("#scrollbar").length) {
      var scrollbar = Scrollbar.init(document.querySelector("#scrollbar"), {
        damping: 0.05,
        renderByPixel: true,
        continuousScrolling: true,
      });
    }
    if ($("#scrollbar2").length) {
      var scrollbar2 = Scrollbar.init(document.querySelector("#scrollbar2"), {
        damping: 0.05,
        renderByPixel: true,
        continuousScrolling: true,
      });
    }
  }

  /**
    Header Fixed
  **/
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 40) {
      $("body").addClass("fixed");
    } else {
      $("body").removeClass("fixed");
    }
  });

  // page loading
  $(window).on("load", function () {
    anime({
      targets: ".art-preloader",
      opacity: [1, 0],
      delay: 2200,
      duration: 400,
      easing: "linear",
      complete: function (anim) {
        $(".art-preloader").css("display", "none");
      },
    });
    initCounters(false);
    initSkillBars();
  });
  /* $(".art-preloader-load-first").hide();
  var bar = new ProgressBar.Line(preloader, {
    strokeWidth: 1.7,
    easing: "easeInOut",
    duration: 1400,
    delay: 750,
    trailWidth: 1.7,
    svgStyle: {
      width: "100%",
      height: "100%",
    },
    step: (state, bar) => {
      bar.setText(Math.round(bar.value() * 100) + " %");
    },
  });

  bar.animate(1); */

  // Contact form
  $(".art-input").keyup(function () {
    if ($(this).val()) {
      $(this).addClass("art-active");
    } else {
      $(this).removeClass("art-active");
    }
  });

  // Selecciona el formulario por su clase
  const form = document.querySelector(".wpcf7-form");
  let nombre = "";
  let email = "";
  let mensaje = "";

  if (form) {
    // Agrega un listener al evento submit del formulario
    form.addEventListener("submit", function (event) {
      // Prevenir el comportamiento predeterminado del submit
      nombre = document.querySelector('input[name="your-name"]').value;
      email = document.querySelector('input[name="your-email"]').value;
      mensaje = document.querySelector('textarea[name="your-message"]').value;
      event.preventDefault();

      // Eliminar la clase "invalid" si existe
      form.classList.remove("invalid");

      // Validaciones de campos
      let isValid = true; // Variable para rastrear la validez del formulario

      if (!nombre || !email || !mensaje) {
        isValid = false;
      }

      if (!isValidEmail(email)) {
        isValid = false;
      }

      if (!isValid) {
        form.classList.add("invalid"); // Agrega la clase "invalid"
        return; // Detiene la ejecución si hay campos inválidos
      }

      // Tu función personalizada
      customSubmitFunction(event);

      // Si deseas continuar con el envío predeterminado después de tu lógica personalizada,
      // puedes llamar a form.submit() o eliminar el preventDefault() si no lo necesitas.
    });
  }

  // Definición de la función personalizada
  const customSubmitFunction = (event) => {
    setTimeout(() => {
      console.log($(form).hasClass("invalid"));
      if (!$(form).hasClass("invalid")) {
        // Aquí va tu lógica personalizada
        console.log("Formulario enviado. Realizando lógica personalizada.");
        // Formato de enlace de WhatsApp
        const numeroTelefono = "1540342342"; // Reemplaza con tu número de teléfono, incluyendo el código de país
        const mensajeWhatsApp = `Nombre: ${nombre}%0AEmail: ${email}%0AMensaje: ${mensaje}`;
        const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeWhatsApp}`;

        window.open(enlaceWhatsApp, "_blank"); // Abre WhatsApp en una nueva pestaña
      }
    }, 500);
  };

  // Función para validar el formato de correo electrónico
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // portfolio filter
  $(".art-filter a").on("click", function () {
    $(".art-filter .art-current").removeClass("art-current");
    $(this).addClass("art-current");

    var selector = $(this).data("filter");
    $(".art-grid").isotope({
      filter: selector,
    });
    return false;
  });

  /*
    Initialize portfolio items
  */
  if ($(".art-grid").length) {
    var $container = $(".art-grid");
    $container.imagesLoaded(function () {
      $container.isotope({
        filter: "*",
        itemSelector: ".art-grid-item",
        transitionDuration: ".6s",
      });
      $(document).on("lazyloaded", function (e) {
        $container.isotope("reloadItems").isotope();
      });
    });
  }

  // slider works
  var swiper = new Swiper(".art-works-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1400,
    autoplay: {
      delay: 4000,
    },
    autoplaySpeed: 5000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".art-works-swiper-next",
      prevEl: ".art-works-swiper-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 2,
      },
    },
  });

  /*
    Magnific Popups
  */
  bindMagnificPopups();

  $(".current-menu-item a").clone().appendTo(".art-current-page");

  $(".art-map-overlay").on("click", function () {
    $(this).addClass("art-active");
  });

  $(".art-info-bar-btn").on("click", function () {
    $(".art-info-bar").toggleClass("art-active");
    $(".art-menu-bar-btn").toggleClass("art-disabled");
  });

  $(".art-menu-bar-btn").on("click", function () {
    $(".art-menu-bar-btn , .art-menu-bar").toggleClass("art-active");
    $(".art-info-bar-btn").toggleClass("art-disabled");
  });

  $(".art-info-bar-btn , .art-menu-bar-btn").on("click", function () {
    $(".art-content").toggleClass("art-active");
  });

  $(".art-curtain , .art-mobile-top-bar").on("click", function () {
    $(
      ".art-menu-bar-btn , .art-menu-bar , .art-info-bar , .art-content , .art-menu-bar-btn , .art-info-bar-btn"
    ).removeClass("art-active , art-disabled");
  });

  $(".menu-item a").on("click", function () {
    if ($(this).parent().hasClass("menu-item-has-children")) {
      $(this).parent().children(".sub-menu").toggleClass("art-active");
      if (
        $(this).attr("href") != "" &&
        $(this).attr("href") != "#" &&
        $(this).attr("href") != "#."
      ) {
        if ($(this).parent().hasClass("opened")) {
          $(this).parent().removeClass("opened");
        } else {
          $(this).parent().addClass("opened");
          return false;
        }
      } else {
        return false;
      }
    } else {
      $(
        ".art-menu-bar-btn , .art-menu-bar , .art-info-bar , .art-content , .art-menu-bar-btn , .art-info-bar-btn"
      ).removeClass("art-active , art-disabled");
    }

    if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
      if ($(this).attr("href").charAt(0) == "#") {
        var section_id = $(this).attr("href");

        if ($(section_id).length && !$("body").hasClass("default--scrolling")) {
          var section_top =
            scrollbar.scrollTop + $(section_id).offset().top - 30;
          scrollbar.scrollTo(0, section_top, 500);
        }
      }
    }
  });

  $(".art-price-list li").each(function () {
    if ($(this).find("del").text()) {
      $(this).addClass("art-empty-item");
      $(this).html($(this).find("del").text());
    }
  });

  $(".art-input").on("focusin", function () {
    $(this).parent().next("label").addClass("focused");
  });
  $(".art-input").on("focusout", function () {
    $(this).parent().next("label").removeClass("focused");
  });

  /* Cart Popup */
  $(".cart-btn .cart-icon").on("click", function () {
    if ($(this).closest(".cart-btn").hasClass("opened")) {
      $(this).closest(".cart-btn").removeClass("opened");
    } else {
      $(this).closest(".cart-btn").addClass("opened");
    }
    return false;
  });
})(jQuery);

function initHomeBlogSlider() {
  return new Swiper(".art-blog-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1400,
    autoplay: {
      delay: 4000,
    },
    autoplaySpeed: 5000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".art-blog-swiper-next",
      prevEl: ".art-blog-swiper-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      720: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2,
      },
      1500: {
        slidesPerView: 3,
      },
    },
  });
}

function assetUrlKey(el, baseUrl) {
  const raw = el.getAttribute("src") || el.getAttribute("href") || "";
  try {
    return new URL(raw, baseUrl || location.href).pathname;
  } catch (err) {
    return raw;
  }
}

function waitForStylesheet(link) {
  return new Promise(function (resolve) {
    if (!link.href) {
      resolve();
      return;
    }
    if (link.sheet) {
      resolve();
      return;
    }
    link.addEventListener("load", resolve, { once: true });
    link.addEventListener("error", resolve, { once: true });
  });
}

function adoptPageStyles(doc, pageUrl) {
  const pending = [];
  const existingHrefs = new Set();
  const existingIds = new Set();

  document.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
    existingHrefs.add(assetUrlKey(link));
    if (link.id) existingIds.add(link.id);
  });

  doc.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
    const hrefAttr = link.getAttribute("href");
    if (!hrefAttr) return;
    const hrefKey = assetUrlKey(link, pageUrl);
    if ((link.id && existingIds.has(link.id)) || existingHrefs.has(hrefKey)) {
      return;
    }
    const clone = document.createElement("link");
    clone.rel = "stylesheet";
    clone.href = new URL(hrefAttr, pageUrl).href;
    if (link.id) clone.id = link.id;
    clone.setAttribute("data-instant-page-asset", "");
    document.head.appendChild(clone);
    pending.push(waitForStylesheet(clone));
  });

  document.querySelectorAll("style[data-instant-page-asset]").forEach(function (style) {
    style.remove();
  });

  const newContent = doc.querySelector(".art-content");
  doc.querySelectorAll("style").forEach(function (style) {
    if (newContent && newContent.contains(style)) return;
    const clone = document.createElement("style");
    clone.textContent = style.textContent;
    if (style.id) clone.id = style.id;
    clone.setAttribute("data-instant-page-asset", "");
    document.head.appendChild(clone);
  });

  return Promise.all(pending);
}

function adoptPageScripts(doc, pageUrl) {
  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  const existing = new Set();
  document.querySelectorAll("script[src]").forEach(function (script) {
    existing.add(assetUrlKey(script));
    if (script.id) existing.add(script.id);
  });

  const scriptsToLoad = [];
  doc.querySelectorAll("script[src]").forEach(function (script) {
    const srcAttr = script.getAttribute("src");
    if (!srcAttr) return;
    const srcKey = assetUrlKey(script, pageUrl);
    if (srcKey.indexOf("/main.js") !== -1) return;
    if (existing.has(srcKey) || (script.id && existing.has(script.id))) return;
    scriptsToLoad.push(script);
  });

  return scriptsToLoad.reduce(function (chain, script) {
    return chain.then(function () {
      return new Promise(function (resolve) {
        const clone = document.createElement("script");
        clone.src = new URL(script.getAttribute("src"), pageUrl).href;
        if (script.id) clone.id = script.id;
        clone.setAttribute("data-instant-page-asset", "");
        clone.onload = resolve;
        clone.onerror = resolve;
        document.body.appendChild(clone);
      });
    });
  }, Promise.resolve());
}

function resetPageScroll() {
  const scrollbarEl = document.querySelector("#scrollbar");
  if (typeof Scrollbar !== "undefined" && scrollbarEl) {
    const sb = Scrollbar.get(scrollbarEl);
    if (sb) sb.setPosition(0, 0);
  }
  window.scrollTo(0, 0);
  if (scrollbarEl) scrollbarEl.scrollTop = 0;
}

function reactivateInlineStyles(root) {
  if (!root) return;
  root.querySelectorAll("style").forEach(function (style) {
    const fresh = document.createElement("style");
    fresh.textContent = style.textContent;
    Array.from(style.attributes).forEach(function (attr) {
      fresh.setAttribute(attr.name, attr.value);
    });
    style.replaceWith(fresh);
  });
}

function highlightCodeBlocks() {
  if (window.Prism && typeof window.Prism.highlightAll === "function") {
    window.Prism.highlightAll();
  }
  if (window.jQuery) {
    window.jQuery('pre[data-show-toolbar="no"]').siblings("div.toolbar").hide();
  }
}

function swapPageContent(doc, url, push) {
  const currentContent = document.querySelector(".art-content");
  const newContent = doc.querySelector(".art-content");
  if (!currentContent || !newContent) return false;

  document.title = doc.title;
  if (doc.body && doc.body.className) {
    document.body.className = doc.body.className;
  }

  if (push) {
    history.pushState({}, "", url);
  }

  // Re-parse in the live document so <style> tags actually apply (DOMParser nodes often don't).
  currentContent.outerHTML = newContent.outerHTML;
  const liveContent = document.querySelector(".art-content");
  reactivateInlineStyles(liveContent);
  highlightCodeBlocks();
  resetPageScroll();
  return true;
}

async function navigateWithFetchedPage(url, push) {
  const response = await fetch(url, { credentials: "same-origin" });
  if (!response.ok) throw new Error("Error al cargar la página");

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  await adoptPageStyles(doc, url);
  await adoptPageScripts(doc, url);

  const applySwap = function () {
    if (!swapPageContent(doc, url, push)) {
      window.location.href = url;
    }
  };

  if (!document.startViewTransition) {
    applySwap();
    window.reinitScripts();
    return;
  }

  const transition = document.startViewTransition(applySwap);
  transition.finished.then(
    function () {
      window.reinitScripts();
    },
    function () {
      window.reinitScripts();
    }
  );
}

// --- View Transitions / instant navigation ---
document.addEventListener("click", async function (e) {
  const link = e.target.closest("a");

  if (!link) return;
  const hrefAttr = link.getAttribute("href");
  if (!hrefAttr || hrefAttr === "#" || hrefAttr.startsWith("#")) return;
  if (e.defaultPrevented) return;
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  if (link.origin !== location.origin || link.target === "_blank" || link.hasAttribute("data-no-swup")) return;
  if (link.hasAttribute("download") || hrefAttr.startsWith("mailto:") || hrefAttr.startsWith("tel:")) return;
  if (link.hasAttribute("data-magnific-image") || link.hasAttribute("data-magnific-inline") || link.hasAttribute("data-magnific-video") || link.hasAttribute("data-magnific-gallery")) return;
  if (/\.(svg|png|jpe?g|gif|webp)(\?|#|$)/i.test(link.pathname)) return;

  e.preventDefault();
  const url = link.href;

  try {
    await navigateWithFetchedPage(url, true);
  } catch (err) {
    console.error("Error en transición:", err);
    window.location.href = url;
  }
});

window.addEventListener("popstate", async function () {
  try {
    await navigateWithFetchedPage(location.href, false);
  } catch (err) {
    window.location.reload();
  }
});

window.reinitScripts = function () {
  try {
    reinitPageWidgets();
  } catch (err) {
    console.error("Error reinitializing page scripts:", err);
  }

  if (typeof window.bindMagnificPopups === "function") {
    window.bindMagnificPopups();
  } else if (typeof window.bindMagnificImageLinks === "function") {
    window.bindMagnificImageLinks();
  }

  if (typeof window.initCounters === "function") {
    window.initCounters(true);
  }
  if (typeof window.initSkillBars === "function") {
    window.initSkillBars();
  }

  highlightCodeBlocks();
  document.dispatchEvent(new Event("swup:contentReplaced"));
  document.dispatchEvent(new Event("elementor/lazyload/observe"));
};

function reinitPageWidgets() {
  // portfolio filter
  $(".art-filter a").off("click").on("click", function () {
    $(".art-filter .art-current").removeClass("art-current");
    $(this).addClass("art-current");

    var selector = $(this).data("filter");
    $(".art-grid").isotope({
      filter: selector,
    });
    return false;
  });

  // Initialize portfolio items
  if ($(".art-grid").length) {
    var $container = $(".art-grid");

    // Layout sincrónico para evitar parpadeos en View Transitions
    $container.isotope({
      filter: "*",
      itemSelector: ".art-grid-item",
      transitionDuration: "0s",
    });

    $container.imagesLoaded(function () {
      $container.isotope({ transitionDuration: ".6s" });
      $container.isotope("layout");
      $(document).off("lazyloaded").on("lazyloaded", function (e) {
        $container.isotope("reloadItems").isotope();
      });
    });
  }

  // menu active update
  $(".main-menu .menu-item").removeClass("current-menu-item current_page_item");
  $(".main-menu .menu-item a").each(function () {
    if ($(this).prop("href") === location.href || $(this).prop("href") === location.href.replace(/\/$/, "") + "/") {
      $(this).parent().addClass("current-menu-item current_page_item");
    }
  });
  $(".art-current-page").empty();
  $(".current-menu-item a").clone().appendTo(".art-current-page");

  // reset form
  $(".art-input").off("keyup.instantNav").on("keyup.instantNav", function () {
    if ($(this).val()) { $(this).addClass("art-active"); }
    else { $(this).removeClass("art-active"); }
  });
  $(".art-input").off("focusin.instantNav").on("focusin.instantNav", function () { $(this).parent().next("label").addClass("focused"); });
  $(".art-input").off("focusout.instantNav").on("focusout.instantNav", function () { $(this).parent().next("label").removeClass("focused"); });

  // slider works
  if ($(".art-works-slider").length) {
    new Swiper(".art-works-slider", {
      slidesPerView: 3, spaceBetween: 30, speed: 1400,
      autoplay: { delay: 4000 }, autoplaySpeed: 5000,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".art-works-swiper-next", prevEl: ".art-works-swiper-prev" },
      breakpoints: {
        0: { slidesPerView: 1 }, 720: { slidesPerView: 2 },
        1200: { slidesPerView: 2 }, 1500: { slidesPerView: 2 },
      },
    });
  }

  // slider blog
  if ($(".art-blog-slider").length) {
    initHomeBlogSlider();
  }
}
