(async function ($) {
  ("use strict");

  initHomeBlogSlider();

  /* menu custom link */
  $(".menu-item-type-custom").each(function () {
    $(this).find("> a").attr("data-no-swup", "");
  });

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
    // counters
    anime({
      targets: ".art-counter-frame",
      opacity: [0, 1],
      duration: 800,
      delay: 2300,
      easing: "linear",
    });

    anime({
      targets: ".art-counter",
      delay: 1300,
      opacity: [1, 1],
      complete: function (anim) {
        $(".art-counter").each(function () {
          $(this)
            .prop("Counter", 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 2000,
                easing: "linear",
                step: function (now) {
                  $(this).text(Math.ceil(now));
                },
              }
            );
        });
      },
    });

    // progressbars

    var bar_delay = 100;
    $(".art-skills-progress").each(function () {
      var bar_id = $(this).attr("id");
      var bar_val = parseInt($(this).attr("data-value")) / 100;
      var bar_type = $(this).attr("data-type");
      bar_delay = bar_delay + 100;

      if (bar_type == "circles") {
        var bar = new ProgressBar.Circle("#" + bar_id, {
          strokeWidth: 7,
          easing: "easeInOut",
          duration: 1400,
          delay: bar_delay,
          trailWidth: 7,
          step: function (state, circle) {
            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText("");
            } else {
              circle.setText(value);
            }
          },
        });
        bar.animate(bar_val);
      }
      if (bar_type == "progress") {
        var bar = new ProgressBar.Line("#" + bar_id, {
          strokeWidth: 1.72,
          easing: "easeInOut",
          duration: 1400,
          delay: bar_delay,
          trailWidth: 1.72,
          svgStyle: {
            width: "100%",
            height: "100%",
          },
          step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + " %");
          },
        });
        bar.animate(bar_val);
      }
    });
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
  if (
    /\.(?:jpg|jpeg|gif|png)$/i.test(
      $(".wp-block-gallery .art-grid-item:first a").attr("href")
    )
  ) {
    $(".wp-block-gallery a").magnificPopup({
      gallery: {
        enabled: true,
      },
      type: "image",
      closeOnContentClick: false,
      fixedContentPos: false,
      closeBtnInside: false,
      callbacks: {
        beforeOpen: function () {
          // just a hack that adds mfp-anim class to markup
          this.st.image.markup = this.st.image.markup.replace(
            "mfp-figure",
            "mfp-figure mfp-with-anim"
          );
          this.st.mainClass = "mfp-zoom-in";
        },
      },
    });
  }
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
  $("[data-magnific-image]").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = "mfp-zoom-in";
      },
    },
  });
  $("a").each(function (i, el) {
    var href_value = el.href;
    if (/\.(jpg|png|gif)$/.test(href_value)) {
      $(el).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        fixedContentPos: false,
        closeBtnInside: false,
        callbacks: {
          beforeOpen: function () {
            // just a hack that adds mfp-anim class to markup
            this.st.image.markup = this.st.image.markup.replace(
              "mfp-figure",
              "mfp-figure mfp-with-anim"
            );
            this.st.mainClass = "mfp-zoom-in";
          },
        },
      });
    }
  });
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
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = "mfp-zoom-in";
      },
    },
  });
  $("[data-magnific-music]").magnificPopup({
    type: "iframe",
    preloader: false,
    fixedContentPos: false,
    closeBtnInside: true,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = "mfp-zoom-in";
      },
    },
  });
  $("[data-magnific-gallery]").magnificPopup({
    gallery: {
      enabled: true,
    },
    type: "image",
    closeOnContentClick: false,
    fixedContentPos: false,
    closeBtnInside: false,
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = "mfp-zoom-in";
      },
    },
  });

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

// --- View Transitions API Fallback ---
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a');

  // Ignorar si no es un enlace, no tiene href, o es un enlace vacío/ancla
  if (!link) return;
  const hrefAttr = link.getAttribute('href');
  if (!hrefAttr || hrefAttr === '#' || hrefAttr.startsWith('#')) return;

  // Ignorar enlaces externos, nuevas pestañas, o enlaces excluidos explícitamente
  if (link.origin !== location.origin || link.target === '_blank' || link.hasAttribute('data-no-swup')) return;

  e.preventDefault();
  const url = link.href;

  try {
    // 1. Fetch de la página ANTES de iniciar la transición para evitar parpadeos/congelamientos
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al cargar la página');

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    if (!document.startViewTransition) {
      // Fallback si no hay View Transitions
      document.title = doc.title;
      const currentContent = document.querySelector('.art-content');
      const newContent = doc.querySelector('.art-content');
      if (currentContent && newContent) {
        currentContent.replaceWith(newContent);
        history.pushState({}, '', url);
        window.reinitScripts();
        window.scrollTo(0, 0);
      } else {
        window.location.href = url;
      }
      return;
    }

    // 2. Iniciar la transición con el nuevo contenido ya en memoria
    document.startViewTransition(() => {
      document.title = doc.title;

      const currentContent = document.querySelector('.art-content');
      const newContent = doc.querySelector('.art-content');

      if (currentContent && newContent) {
        currentContent.replaceWith(newContent);
      } else {
        window.location.href = url;
        return;
      }

      history.pushState({}, '', url);

      // Re-initialize scripts
      window.reinitScripts();

      // Reset scroll al top
      if (typeof Scrollbar !== 'undefined' && !$("body").hasClass("default--scrolling")) {
        if (document.querySelector("#scrollbar")) {
          const scrollbarInstance = Scrollbar.init(document.querySelector("#scrollbar"), { damping: 0.05, renderByPixel: true, continuousScrolling: true });
          scrollbarInstance.setPosition(0, 0);
        }
      } else {
        window.scrollTo(0, 0);
        const scrollFrame = document.querySelector("#scrollbar");
        if (scrollFrame) scrollFrame.scrollTop = 0;
      }
    });

  } catch (err) {
    console.error('Error en transición:', err);
    window.location.href = url;
  }
});

window.addEventListener('popstate', () => {
  if (!document.startViewTransition) {
    window.location.reload();
    return;
  }

  document.startViewTransition(async () => {
    try {
      const response = await fetch(location.href);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      document.title = doc.title;

      const currentContent = document.querySelector('.art-content');
      const newContent = doc.querySelector('.art-content');

      if (currentContent && newContent) {
        currentContent.replaceWith(newContent);
      } else {
        window.location.reload();
      }

      // Re-initialize scripts
      window.reinitScripts();
    } catch (err) {
      window.location.reload();
    }
  });
});

window.reinitScripts = function() {
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

  // Magnific Popups
  if (/\.(?:jpg|jpeg|gif|png)$/i.test($(".wp-block-gallery .art-grid-item:first a").attr("href"))) {
    $(".wp-block-gallery a").magnificPopup({
      gallery: { enabled: true },
      type: "image",
      closeOnContentClick: false,
      fixedContentPos: false,
      closeBtnInside: false,
      callbacks: {
        beforeOpen: function () {
          this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim");
          this.st.mainClass = "mfp-zoom-in";
        },
      },
    });
  }
  $("[data-magnific-inline]").magnificPopup({
    type: "inline", overflowY: "auto", preloader: false,
    callbacks: { beforeOpen: function () { this.st.mainClass = "mfp-zoom-in"; } },
  });
  $("[data-magnific-image]").magnificPopup({
    type: "image", closeOnContentClick: true, fixedContentPos: false, closeBtnInside: false,
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim");
        this.st.mainClass = "mfp-zoom-in";
      },
    },
  });
  $("a").each(function (i, el) {
    var href_value = el.href;
    if (/\.(jpg|png|gif)$/.test(href_value)) {
      $(el).magnificPopup({
        type: "image", closeOnContentClick: true, fixedContentPos: false, closeBtnInside: false,
        callbacks: {
          beforeOpen: function () {
            this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim");
            this.st.mainClass = "mfp-zoom-in";
          },
        },
      });
    }
  });

  // menu active update
  $(".main-menu .menu-item").removeClass("current-menu-item current_page_item");
  $(".main-menu .menu-item a").each(function() {
      if ($(this).prop("href") === location.href) {
          $(this).parent().addClass("current-menu-item current_page_item");
      }
  });
  $(".art-current-page").empty();
  $(".current-menu-item a").clone().appendTo(".art-current-page");

  // reset form
  $(".art-input").keyup(function () {
    if ($(this).val()) { $(this).addClass("art-active"); }
    else { $(this).removeClass("art-active"); }
  });
  $(".art-input").on("focusin", function () { $(this).parent().next("label").addClass("focused"); });
  $(".art-input").on("focusout", function () { $(this).parent().next("label").removeClass("focused"); });

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
};
