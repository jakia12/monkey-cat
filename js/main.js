var lastScroll = 0;
var isFirefox = typeof InstallTrigger !== "undefined";

var filmstrip, inner, position, filmstripStart;

$(document).ready(function () {
  // Expandable elements (e.g. accordion)
  $(".btn-expandable").click(function () {
    var target = $(this).attr("data-target");
    var h = $(target).find(".expandable-body").outerHeight();
    var state = $(this).attr("aria-expanded");
    if (state == "false") {
      $(this).attr("aria-expanded", true);
      $(target).css("height", h + "px");
      if ($(this).attr("data-text-expanded") != "") {
        $(this).text($(this).attr("data-text-expanded"));
      }
    } else {
      $(this).attr("aria-expanded", false);
      if ($(this).attr("data-text-collapsed") != "") {
        $(this).text($(this).attr("data-text-collapsed"));
      }
      setTimeout(function () {
        $(target).attr("style", "");
      }, 10);
    }
    $(target).toggleClass("collapsed");
    $(this).toggleClass("collapsed");
  });

  if ($(window).width() < 1200) {
    $("nav .menu li a .icon").click(function (e) {
      e.preventDefault();
      if ($(this).parent().next().hasClass("sub-menu")) {
        $(this).toggleClass("active");
        $(this).parent().next().toggleClass("active");
      }
    });
  } else {
  }

  //change Filter
  $(".filter .btn").click(function () {
    $(".filter button.active").removeClass("active");
    $(this).addClass("active");
  });

  //change SliderFilter
  $(".slider-filter a").click(function () {
    $(".slider-filter a.active").removeClass("active");
    $(this).addClass("active");
  });

  //Open Responsive Menu
  $(".navbar-toggle").click(function () {
    $(this).toggleClass("expanded");
    $("header").toggleClass("expanded");
    $("nav .menu").toggleClass("expanded");
  });

  //Open Responsive Menu
  $(".tab-link").click(function () {
    $(this).toggleClass("active");
  });

  // BWG & Marienhöh like https://www.google.com
  $(".expandable-item").mouseenter(function () {
    $(".expandable-item.active").removeClass("active");
    $(this).addClass("active");
  });

  // Close button
  //$('.btn-close').click(function () {
  //    if ($('.fullscreen-overlay').length) {
  //        hideElement($('.fullscreen-overlay'));
  //    }
  //    hideElement($(this).parent());
  //})

  // Close Dialog/PopUp
  $(".btn-popup-close").click(function () {
    var target = $(this).closest(".popup").attr("id");
    var popup = document.querySelector("#" + target);
    if (popup.tagName == "DIV") {
      hideElement($(popup));
    } else {
      popup.close();
    }
  });

  // Open PopUp
  $(".btn-popup").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("data-target");
    var popup = document.querySelector(target);

    if (popup.tagName == "DIV") {
      showElement($(popup));
      popupCloseEventListener(popup, popup.querySelector(".popup-content"));
    } else {
      popup.showModal();
      dialogCloseEventListener(popup);
    }
  });

  // Slider
  $(".slider").each(function () {
    if ($(this).find(".slider-steps").length) {
      addSliderSteps($(this));
      if (isFirefox) {
        $(this).addClass("pb-8");
      }
    }
    makeSlider($(this));
  });

  // Slider Filter
  $(".slider-filter a, .slider-filter button").click(function () {
    var slider = $($(this).parent().attr("data-slider")),
      filter = $(this).attr("data-filter");
    console.log({ slider }, { filter });
    slider.slick("slickUnfilter");
    slider.slick("slickFilter", "." + filter);

    setTimeout(function () {
      slider.slick("slickGoTo", 0);
    }, 500);

    if (slider.find(".slider-steps")) {
      countSlides(slider);
    }
  });

  // Filmstrip - adjust scrollbar width
  makeFilmstrip();

  // Filmstrip - adjust scrollbar position
  $(".filmstrip .row").scroll(function (e) {
    position = $(this).parent().find(".scroll-position-inner");
    position.css(
      "left",
      ($(this).scrollLeft() / $(this).get(0).scrollWidth) * 100 + "%"
    );
  });

  // Dev
  // $('.bottom-nav a').click(function (e){
  //     e.preventDefault();
  //     $('.bottom-nav a.active').removeClass('active');
  //     $(this).addClass('active');
  // })

  $(".uc-link").click(function (e) {
    e.preventDefault();
  });

  // Blured images load
  const blurPictures = document.querySelectorAll(".blur-load");
  blurPictures.forEach((picture) => {
    const img = picture.querySelector("img");
    // console.log({img});

    // if (img.complete) {
    //     console.log('complete loading');
    //     loaded(picture);
    // } else {
    //     console.log('loading');
    //     img.addEventListener('load', loaded(picture));
    // }
    img.onload = function () {
      picture.classList.add("loaded");
    };
  });

  $(".icon-play").click(function () {
    $(this).prev().get(0).play();
    $(this).prev().attr("controls", true);
    $(this).hide();
  });

  $(".ctc").click(function (e) {
    e.preventDefault();
    navigator.clipboard.writeText($(this).attr("ctc")).then(
      () => {
        /* clipboard successfully set */
        console.log("Copied");
        var tooltip = $(this).next();
        tooltip.addClass("active");
        setTimeout(function () {
          tooltip.removeClass("active");
        }, 1500);
      },
      () => {
        /* clipboard write failed */
        console.log("Copy failed");
      }
    );
  });

  var waves = new SineWaves({
    el: document.getElementById("hero-waves"),

    speed: 8,

    width: function () {
      return $(window).width();
    },

    height: function () {
      return $(window).height();
    },

    wavesWidth: "100%",

    ease: "SineInOut",

    waves: [
      // First
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 150,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 170,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 190,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 210,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 230,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 250,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 270,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 290,
        wavelength: 200,
        segmentLength: 20,
      },
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 310,
        wavelength: 200,
        segmentLength: 20,
      },
      // Second
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 150,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 170,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 190,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 210,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 230,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 250,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 270,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 290,
        wavelength: 100,
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: 310,
        wavelength: 100,
      },
      // Third
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -150,
        wavelength: 50,
        segmentLength: 10,
      },
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -170,
        wavelength: 50,
        segmentLength: 10,
      },
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -190,
        wavelength: 50,
        segmentLength: 10,
      },
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -210,
        wavelength: 50,
        segmentLength: 10,
      },
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -230,
        wavelength: 50,
        segmentLength: 10,
      },
      // Fourth
      {
        timeModifier: 1,
        lineWidth: 0.5,
        amplitude: -100,
        wavelength: 100,
        segmentLength: 10,
        //       strokeStyle: 'rgba(255, 255, 255, 0.1)'
      },
    ],

    initialize: function () {},

    resizeEvent: function () {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0, "rgba(5, 36, 20, 0)");
      gradient.addColorStop(0.5, "rgb(235, 180, 42,0.5)");
      gradient.addColorStop(1, "rgba(5, 36, 20, 0)");

      var index = -1;
      var length = this.waves.length;
      while (++index < length) {
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    },
  });
});

$(window).scroll(function () {
  var currentScroll = $(this).scrollTop();
  if (currentScroll > lastScroll) {
    // down
    console.log("down");
    $("header").addClass("hidden");
  } else {
    console.log("up");
    $("header")
      .removeClass("hidden")
      .removeClass("transparent")
      .addClass("fixed");
  }
  if (currentScroll == 0 && $(".stage").length > 0) {
    $("header").addClass("absolute transparent");
  }
  lastScroll = currentScroll;
});

$(window).resize(function () {
  makeFilmstrip();
});

function showElement(element) {
  element.addClass("visible");
}

function hideElement(element) {
  element.removeClass("visible");
}

function dialogCloseEventListener(dialog) {
  console.log(dialog);
  dialog.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    console.log(dialogDimensions);
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });
}

function popupCloseEventListener(popup, popupContent) {
  popup.addEventListener("click", (e) => {
    const popupContentDimensions = popupContent.getBoundingClientRect();
    console.log(popupContentDimensions);
    if (
      e.clientX < popupContentDimensions.left ||
      e.clientX > popupContentDimensions.right ||
      e.clientY < popupContentDimensions.top ||
      e.clientY > popupContentDimensions.bottom
    ) {
      hideElement($(".popup.visible"));
    }
  });
}

// Slider
function makeSlider(element) {
  var slidesToShow = 1,
    slidesToShowXl = 1,
    slidesToShowLg = 1,
    slidesToShowMd = 1,
    slidesToShowSm = 1,
    slidesToScroll = 1,
    infinite = true,
    dots = false,
    arrows = true,
    autoplay = false,
    centerMode = false,
    centerPadding = "50px",
    fade = false;

  if (element.attr("data-slides-to-show")) {
    slidesToShow = parseInt(element.attr("data-slides-to-show"));
  }
  if (element.attr("data-slides-to-show-xl")) {
    slidesToShowXl = parseInt(element.attr("data-slides-to-show-xl"));
  }
  if (element.attr("data-slides-to-show-lg")) {
    slidesToShowLg = parseInt(element.attr("data-slides-to-show-lg"));
  }
  if (element.attr("data-slides-to-show-md")) {
    slidesToShowMd = parseInt(element.attr("data-slides-to-show-md"));
  }
  if (element.attr("data-slides-to-show-sm")) {
    slidesToShowSm = parseInt(element.attr("data-slides-to-show-sm"));
  }
  if (element.attr("data-slides-to-scroll")) {
    slidesToScroll = parseInt(element.attr("data-slides-to-scroll"));
  }
  if (element.attr("data-infinite")) {
    infinite = JSON.parse(element.attr("data-infinite"));
  }
  if (element.attr("data-dots")) {
    dots = JSON.parse(element.attr("data-dots"));
  }
  if (element.attr("data-arrows")) {
    arrows = JSON.parse(element.attr("data-arrows"));
  }
  if (element.attr("data-autoplay")) {
    autoplay = JSON.parse(element.attr("data-autoplay"));
  }
  if (element.attr("data-center-mode")) {
    centerMode = JSON.parse(element.attr("data-center-mode"));
  }
  if (element.attr("data-center-padding")) {
    centerPadding = element.attr("data-center-padding");
  }
  if (element.attr("data-fade")) {
    fade = JSON.parse(element.attr("data-fade"));
  }

  element.slick({
    infinite: infinite,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    dots: dots,
    arrows: arrows,
    autoplay: autoplay,
    centerMode: centerMode,
    centerPadding: centerPadding,
    fade: fade,
    slide: ".slider-item",
    swipeToSlide: true,
    touchThreshold: 15,
    edgeFriction: 0.05,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: slidesToShowXl,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: slidesToShowLg,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShowMd,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: slidesToShowSm,
        },
      },
    ],
  });
}

function countSlides(slider) {
  var count = slider.find(".slider-item:not(.slick-cloned)").length;
  if (count < 10) {
    count = "0" + count;
  }
  slider.find(".slider-steps-total").text(count);
}

function addSliderSteps(element) {
  element.on("init", function (event, slick) {
    countSlides(element);
  });
  element.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    var slide = nextSlide + 1;
    if (slide < 10) {
      slide = "0" + slide;
    }
    element.find(".slider-step-current").text(slide);
  });
}

function makeFilmstrip() {
  $(".filmstrip").each(function () {
    filmstrip = $(this);
    inner = $(this).find(".row");
    position = $(this).find(".scroll-position-inner");
    filmstripStart = $(this).attr("data-filmstrip-start");
    // Check when filmstrip should be made
    if (typeof filmstripStart !== "undefined" && filmstripStart != "") {
      if ($(window).width() < filmstripStart) {
        inner.css("flex-wrap", "nowrap");
      } else {
        inner.css("flex-wrap", "wrap");
      }
    }
    // Check if scrollbar should be shown
    if (filmstrip.outerWidth() + 10 < inner.get(0).scrollWidth) {
      position.parent().show();
      position.css(
        "width",
        (filmstrip.outerWidth() / inner.get(0).scrollWidth) * 100 + "%"
      );
    } else {
      position.parent().hide();
    }
  });
}
