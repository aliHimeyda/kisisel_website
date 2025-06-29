$(function () {
  "use strict";

  var wind = $(window);

  /* =============================================================================
    -----------------------------  Smooth Scroll nav   -----------------------------
    ============================================================================= */

  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "swing", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: 0, // offste (in px) for fixed top navigation
  });

  /* =============================================================================
    --------------------------------  Navbar Menu   --------------------------------
    ============================================================================= */

  $(".nav-top").on("click", ".nav-butn", function () {
    $(".navbar").slideToggle().addClass("active");
  });

  $(".navbar").on("click", ".nav-item", function () {
    $(".navbar.active").slideUp();
  });

  /* =============================================================================
    ------------------------------  Data Background   ------------------------------
    ============================================================================= */

  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });

  /* =============================================================================
    -----------------------------------  Tabs  -------------------------------------
    ============================================================================= */

  $("#tabs .tab-links").on("click", ".item-link", function () {
    var tab_id = $(this).attr("data-tab");

    $("#tabs .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").hide();
    $("#" + tab_id).show();
  });

  $("#tabs-fade .tab-links").on("click", ".item-link", function () {
    var tab2_id = $(this).attr("data-tab");

    $("#tabs-fade .tab-links .item-link").removeClass("current");
    $(this).addClass("current");

    $(".tab-content").fadeOut();
    $("#" + tab2_id).fadeIn();
  });

  /* =============================================================================
    --------------------------------  Accordion  -----------------------------------
    ============================================================================= */

  $(".accordion").on("click", ".title", function () {
    $(this).next().slideDown();

    $(".accordion-info").not($(this).next()).slideUp();
  });

  $(".accordion").on("click", ".item", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* =============================================================================
    ---------------------------------  Tolltip  ------------------------------------
    ============================================================================= */

  $("[data-tooltip-tit]")
    .hover(
      function () {
        $('<div class="div-tooltip-tit"></div>')
          .text($(this).attr("data-tooltip-tit"))
          .appendTo("body")
          .fadeIn("slow");
      },
      function () {
        $(".div-tooltip-tit").remove();
      }
    )
    .mousemove(function (e) {
      $(".div-tooltip-tit").css({ top: e.pageY + 10, left: e.pageX + 20 });
    });

  $("[data-tooltip-sub]")
    .hover(
      function () {
        $('<div class="div-tooltip-sub"></div>')
          .text($(this).attr("data-tooltip-sub"))
          .appendTo("body")
          .fadeIn("slow");
      },
      function () {
        $(".div-tooltip-sub").remove();
      }
    )
    .mousemove(function (e) {
      $(".div-tooltip-sub").css({ top: e.pageY + -15, left: e.pageX + 30 });
    });

  /* =============================================================================
    -------------------------------  Progress Bar  ---------------------------------
    ============================================================================= */

  wind.on("scroll", function () {
    $(".skill-progress .progres").each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal,
        });
      }
    });
  });

  /* =============================================================================
    -----------------------------  Trigger Plugins  --------------------------------
    ============================================================================= */

  /* ========== Sticky ========== */

  $("#sticky_item").stick_in_parent();

  /* ========== YouTubePopUp ========== */

  $("a.vid").YouTubePopUp();

  /* ========== parallaxie ========== */

  $(".parallaxie").parallaxie({
    speed: 0.8,
    size: "cover",
  });

  /* ========== paroller ========== */

  $(".my-paroller").paroller();

  /* ========== magnificPopup ========== */

  $(".popup-img , .gallery").magnificPopup({
    delegate: ".popimg",
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* =========== hover3d =========== */

  $(".hover3d").hover3d({
    selector: ".hover3d-child",
    invert: true,
  });

  /* =========== countUp =========== */

  $(".number-sec .count").countUp({
    delay: 10,
    time: 500,
  });

  /* ===========  Splitting  =========== */

  Splitting();
});

/* =============================================================================
-----------------------------  Parallax Animation  -----------------------------
============================================================================= */

(function () {
  const link = document.querySelectorAll(".hover-this");
  const cursor = document.querySelector(".cursor");
  const animateit = function (e) {
    const hoverAnim = this.querySelector(".hover-anim");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;
    hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === "mouseleave") hoverAnim.style.transform = "";
  };
  const editCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };
  link.forEach((b) => b.addEventListener("mousemove", animateit));
  link.forEach((b) => b.addEventListener("mouseleave", animateit));
  window.addEventListener("mousemove", editCursor);

  $("a, .cursor-pointer").hover(
    function () {
      $(".cursor").addClass("cursor-active");
    },
    function () {
      $(".cursor").removeClass("cursor-active");
    }
  );

  let elements = document.querySelectorAll(".rolling-text");

  elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      let span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
  });

  elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.classList.remove("play");
    });
  });
})();

/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(window).on("load", function () {
  /* =============================================================================
    ---------------------------------  Preloader  ----------------------------------
    ============================================================================= */

  var body = $("body");
  body.addClass("loaded");
  setTimeout(function () {
    body.removeClass("loaded");
  }, 1500);

  /* =============================================================================
    -----------------------------  isotope Masonery   ------------------------------
    ============================================================================= */

  $(".gallery").isotope({
    itemSelector: ".items",
  });

  var $gallery = $(".gallery").isotope();

  $(".filtering").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });

  $(".filtering").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  /* =============================================================================
    -----------------------------  Contact Valdition   -----------------------------
    ============================================================================= */

  $("#contact-form").validator();

  $("#contact-form").on("submit", function (e) {
    if (!e.isDefaultPrevented()) {
      var url = "contact.php";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form").find(".messages").html(alertBox);
            $("#contact-form")[0].reset();
          }
        },
      });
      return false;
    }
  });
});

/* =============================================================================
-----------------------------  Button scroll up   ------------------------------
============================================================================= */

$(document).ready(function () {
  "use strict";

  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 150;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});

/* =============================================================================
-------------------------------  Wow Animation   -------------------------------
============================================================================= */

wow = new WOW({
  animateClass: "animated",
  offset: 100,
});
wow.init();

/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(function () {
  "use strict";

  /* =============================================================================
    ----------------------------  Swiper Data Controls   ---------------------------
    ============================================================================= */

  $('[data-carousel="swiper"]').each(function () {
    var containe = $(this).find('[data-swiper="container"]').attr("id");
    var pagination = $(this).find('[data-swiper="pagination"]').attr("id");
    var prev = $(this).find('[data-swiper="prev"]').attr("id");
    var next = $(this).find('[data-swiper="next"]').attr("id");
    var items = $(this).data("items");
    var autoplay = $(this).data("autoplay");
    var iSlide = $(this).data("initial");
    var loop = $(this).data("loop");
    var parallax = $(this).data("parallax");
    var space = $(this).data("space");
    var speed = $(this).data("speed");
    var center = $(this).data("center");
    var effect = $(this).data("effect");
    var direction = $(this).data("direction");
    var mousewheel = $(this).data("mousewheel");
    var index = 0;

    // Configuration
    var conf = {};

    // Responsive
    if ($(this).hasClass("swiper5")) {
      var conf = {
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        },
      };
    }

    if ($(this).hasClass("swiper4")) {
      var conf = {
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        },
      };
    }

    if ($(this).hasClass("work-swiper")) {
      var conf = {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".work-controls .swiper-button-next",
          prevEl: ".work-controls .swiper-button-prev",
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
        },
      };
    }

    if ($(this).hasClass("testim-swiper")) {
      var conf = {
        pagination: {
          el: ".testimonials .swiper-pagination",
          clickable: true,
        },

        navigation: {
          nextEl: ".testimonials .testim-controls .swiper-button-next",
          prevEl: ".testimonials .testim-controls .swiper-button-prev",
        },
      };
    }

    if ($(this).hasClass("pagination")) {
      var conf = {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      };
    }

    if (items) {
      conf.slidesPerView = items;
    }
    if (autoplay) {
      conf.autoplay = autoplay;
    }
    if (iSlide) {
      conf.initialSlide = iSlide;
    }
    if (center) {
      conf.centeredSlides = center;
    }
    if (loop) {
      conf.loop = loop;
    }
    if (parallax) {
      conf.parallax = parallax;
    }
    if (space) {
      conf.spaceBetween = space;
    }
    if (speed) {
      conf.speed = speed;
    }
    if (mousewheel) {
      conf.mousewheel = mousewheel;
    }
    if (effect) {
      conf.effect = effect;
    }
    if (direction) {
      conf.direction = direction;
    }
    if (prev) {
      conf.prevButton = "#" + prev;
    }
    if (next) {
      conf.nextButton = "#" + next;
    }
    if (pagination) {
      (conf.pagination = "#" + pagination), (conf.paginationClickable = true);
    }

    // Initialization
    if (containe) {
      var initID = "#" + containe;
      var init = new Swiper(initID, conf);
    }
  });

  /* =============================================================================
    -------------------------------  Preloader svg   -------------------------------
    ============================================================================= */

  const svg = document.getElementById("svg");
  const tl = gsap.timeline();
  const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
  const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

  tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
    delay: 1.5,
    y: -100,
    opacity: 0,
  });
  tl.to(svg, {
    duration: 0.5,
    attr: { d: curve },
    ease: "power2.easeIn",
  }).to(svg, {
    duration: 0.5,
    attr: { d: flat },
    ease: "power2.easeOut",
  });
  tl.to(".loader-wrap", {
    y: -1500,
  });
  tl.to(".loader-wrap", {
    zIndex: -1,
    display: "none",
  });
  tl.from(
    "header",
    {
      y: 200,
    },
    "-=1.5"
  );
  tl.from(
    "header .container",
    {
      y: 40,
      opacity: 0,
      delay: 0.3,
    },
    "-=1.5"
  );
});

$(function () {
  var width = $(window).width();
  if (width < 991) {
    ("use strict");

    $(".navbar .navbar-nav").on("click", ".nav-link", function () {
      $(".navbar .navbar-nav .dropdown .dropdown-menu").removeClass("show");

      $(this).parent().find(".dropdown-menu").addClass("show");
    });
  }
});

const prevbutonu = document.querySelector(".prev");
const nextbutonu = document.querySelector(".next.ml-auto");
const workresmi = document.querySelectorAll(".workresmi");
const anaresim = document.querySelector(".anaresim");
const resim2 = document.querySelector(".resim2");
const resim3 = document.querySelector(".resim3");
const resim4 = document.querySelector(".resim4");
const resim5 = document.querySelector(".resim5");
const projebaciklamalaridiv = document.querySelector(".cont.md-mb50");
const projeyanozellikleri = document.querySelector("#sticky_item");

var worknumarasi;
if (localStorage.getItem("sayfanumarasi") != null) {
  worknumarasi = localStorage.getItem("sayfanumarasi");
} else {
  worknumarasi = 0;
}
const proje = [
  {
    resmi: "assets/imgs/works/project1/",
    basligi: "Flutter-Based File Manager Application",
    ilkaciklama:
      "This project is a file manager app developed with Flutter, focusing not only on file browsing but also on understanding the file system structure of Android devices.<br>It dives deep into the tree data structure and ensures efficient access to system resources through Flutter.<br>The app supports features like adding, deleting, searching, and navigating within the tree.<br>Users can manage and share files using various Flutter packages.<br>It also includes dark/light theme switching, deep cleaning algorithms, and permission control.<br>Shared Preferences and context/state management were utilized to enhance functionality.<br>Files can be shared through the system picker seamlessly.<br>The project helped strengthen my understanding of system-level mobile development and data structure implementation.<br>The user-friendly interface was a priority throughout the design process.<br>A great learning experience both technically and structurally.",
    cekiciyazi:
      "Not just a file browser—<br>it's a deep dive into mobile file systems!",
    hevesyazisi:
      "I built this app to turn my knowledge of tree data structures into practical implementation.<br>I aimed to understand how file management works at the system level in mobile devices.<br>Through this, I explored Flutter’s capability to interact with system resources effectively.<br>I focused on designing a clean and user-friendly interface.<br>The result was a highly functional and educational file manager app.",
    projetarihi: "15.09.2024",
    katagorisi: "Mobile App",
    ulasimbilgisi: "github.com/aliHimeyda",
    ozellikler: [
      "Tree Structure",
      "Theme Switch",
      "File Sharing",
      "System Access",
    ],
  },
  {
    resmi: "assets/imgs/works/project2/",
    basligi: "Furniture Product Gallery Mobile App",
    ilkaciklama:
      "This mobile app was created to help showcase and promote furniture products for my father's business.<br>Users can filter and sort items by features, price, or popularity.<br>The app supports recently viewed and bookmarked items for smart recommendations.<br>Multilingual support in Turkish, Arabic, and English ensures accessibility for a diverse audience.<br>Category-based listing and WhatsApp integration allow for quick user communication.<br>Fast search and smooth navigation enhance user experience.<br>Throughout the project, I improved my knowledge of Flutter’s widget structure and gained hands-on experience with Dart.<br>I also learned how mobile apps operate on Android and implemented basic API calls.<br>This project strengthened both my UI/UX and technical abilities.<br>Thanks to Flutter, I created a scalable and polished mobile solution.",
    cekiciyazi:
      "Furniture meets Flutter!<br>Smart design and smooth experience in one app!",
    hevesyazisi:
      "I created this app to help my father’s business reach more customers online.<br>With filtering, sorting, and multilingual support, it’s tailored for accessibility.<br>The project also served as a great opportunity to apply and deepen my Flutter skills.<br>It improved my ability to build user-centric and technically sound applications.<br>Excited to develop more solutions like this in the future!",
    projetarihi: "12.10.2024",
    katagorisi: "Business App",
    ulasimbilgisi: "github.com/aliHimeyda",
    ozellikler: ["Multilingual", "Filtering", "WhatsApp Connect", "Smart UX"],
  },

  {
    resmi: "assets/imgs/works/project3/",
    basligi: "Candy Crush Game with C# and Windows Forms",
    ilkaciklama:
      "This project is a fun and interactive Candy Crush-style game developed using C# and Windows Forms.<br>It was designed to reinforce object-oriented programming (OOP) concepts in a practical and engaging way.<br>The game features colorful candies, interactive gameplay, and score tracking mechanics.<br>Using C#, modular and reusable code structures were created through classes and objects.<br>The UI was developed with Windows Forms, making it smooth and responsive.<br>This project allowed me to deepen my understanding of event-driven programming and Windows-based UI logic.<br>Animations and dynamic behavior made the gameplay enjoyable and realistic.<br>I focused on keeping the design user-friendly and engaging.<br>The game structure is scalable for adding new features or levels.<br>This project boosted both my creativity and technical design skills.",
    cekiciyazi:
      "Sweet logic meets colorful fun!<br>Enjoy addictive gameplay while practicing OOP!",
    hevesyazisi:
      "I created this game to practice OOP principles through a fun and visual project.<br>Developing it helped me master Windows Forms and understand UI responsiveness.<br>It was exciting to implement mechanics like matching logic, animations, and score tracking.<br>The modular structure allows for future feature additions.<br>This project gave me hands-on experience in building interactive applications.",
    projetarihi: "10.07.2024",
    katagorisi: "Game Development",
    ulasimbilgisi: "github.com/aliHimeyda",
    ozellikler: [
      "OOP Design",
      "Windows Forms",
      "Interactive UI",
      "Colorful Gameplay",
    ],
  },
  {
    resmi: "assets/imgs/works/project4/",
    basligi: "Interactive Pediatric Scheduling Web App",
    ilkaciklama:
      "This is a pediatric scheduling application developed using HTML, CSS, JavaScript, and React.<br>It allows for dynamically assigning pediatric assistants to different departments in a hospital.<br>The UI includes interactive pop-ups for assistant and faculty profiles, improving workflow transparency.<br>The design is fully responsive, providing smooth usability across devices.<br>Dedicated pages for hospital announcements and emergency alerts were also created.<br>Flexbox and modern CSS techniques were applied for layout and style consistency.<br>The project was part of my web technologies coursework, applying real-world solutions in healthcare management.<br>It was an excellent opportunity to master front-end development and UI design.<br>React’s component-based structure made it easier to build reusable, interactive features.<br>Through this project, I enhanced both my technical and problem-solving capabilities.",
    cekiciyazi: "Efficient pediatric scheduling,<br>now just a click away!",
    hevesyazisi:
      "This project allowed me to solve a real-world problem using front-end technologies.<br>I gained hands-on experience with React, component-based design, and responsive layouts.<br>Managing pediatric assistant schedules became efficient and transparent.<br>It was a valuable learning journey in modern web development.<br>I’m proud to have built something meaningful and useful.",
    projetarihi: "28.08.2024",
    katagorisi: "Web Application",
    ulasimbilgisi: "github.com/aliHimeyda",
    ozellikler: [
      "Responsive UI",
      "React Components",
      "Live Scheduling",
      "Healthcare Focus",
    ],
  },
  {
    resmi: "assets/imgs/works/project5/",
    basligi: "Folder Monitoring Service Running as a System Service",
    ilkaciklama:
      "This project is a directory monitoring application developed using Python and the Watchdog library, designed to run as a system service on Ubuntu Linux.<br>It continuously monitors specified directories 24/7 for events like folder creation, deletion, and file modifications.<br>Each detected change is saved in a .json file with its location and timestamp.<br>The JSON format allows for easy integration with external systems.<br>The service starts automatically when the system boots and runs in the background.<br>Its lightweight nature ensures minimal usage of system resources.<br>The modular structure makes it easily adaptable for monitoring different directories.<br>The code is structured for readability and further development.<br>It is designed to provide a secure and reliable service.<br>A powerful monitoring and logging solution for system administrators.",
    cekiciyazi:
      "Real-time file and folder tracking made easy!<br>Detect changes instantly, log them, and stay in control!",
    hevesyazisi:
      "If you want to instantly track file and folder changes on your system, this project is just for you!<br>It logs every change in detail into a .json file, allowing you to analyze the history.<br>As it runs as a service, it operates continuously in the background without needing manual intervention.<br>Its lightweight structure offers maximum efficiency without affecting system performance.<br>Thanks to its flexible and modular design, it can be easily integrated into various projects.",
    projetarihi: "01.11.2024",
    katagorisi: "System File",
    ulasimbilgisi: "github.com/aliHimeyda",
    ozellikler: ["Low resource", "Auto start", "JSON logging", "Real-time"],
  },
];
workresmi.forEach((element, index) => {
  element.addEventListener("click", function () {
    worknumarasi = index;
    localStorage.setItem("sayfanumarasi", worknumarasi);
  });
});

const postamassage = document.querySelector("#form_button");
const postaprojectmassage = document.querySelector("#project_form_button");
const nameinput = document.querySelector("#form_name");
const subjectinput = document.querySelector("#form_subject");
const mesajinput = document.querySelector("#form_message");
document.addEventListener("DOMContentLoaded", function () {
  prevbutonu.addEventListener("click", function () {
    worknumarasi--;
    if (worknumarasi >= 0) {
      localStorage.setItem("sayfanumarasi", worknumarasi);
    } else {
      localStorage.setItem("sayfanumarasi", 0);
    }
  });
  nextbutonu.addEventListener("click", function () {
    worknumarasi++;
    if (worknumarasi <= 4) {
      localStorage.setItem("sayfanumarasi", worknumarasi);
    } else {
      localStorage.setItem("sayfanumarasi", 4);
    }
  });

  // project detailes sayfasinin iceriginin ozellestirilmesi //

  anaresim.src = proje[worknumarasi].resmi + "1.png";
  resim2.src = proje[worknumarasi].resmi + "2.png";
  resim3.src = proje[worknumarasi].resmi + "3.png";
  resim5.src = proje[worknumarasi].resmi + "5.png";
  resim4.src = proje[worknumarasi].resmi + "4.png";
  projebaciklamalaridiv.children[0].textContent = proje[worknumarasi].basligi;
  projebaciklamalaridiv.children[1].innerHTML = proje[worknumarasi].ilkaciklama;
  projebaciklamalaridiv.children[2].innerHTML = "";
  projebaciklamalaridiv.children[3].children[0].innerHTML =
    proje[worknumarasi].cekiciyazi;
  projebaciklamalaridiv.children[3].children[1].innerHTML =
    proje[worknumarasi].hevesyazisi;
  projebaciklamalaridiv.children[3].children[2].children[0].children[1].textContent =
    proje[worknumarasi].ozellikler[0];
  projebaciklamalaridiv.children[3].children[2].children[1].children[1].textContent =
    proje[worknumarasi].ozellikler[1];
  projebaciklamalaridiv.children[3].children[2].children[2].children[1].textContent =
    proje[worknumarasi].ozellikler[2];
  projebaciklamalaridiv.children[3].children[2].children[3].children[1].textContent =
    proje[worknumarasi].ozellikler[3];
  projeyanozellikleri.firstElementChild.children[0].children[1].textContent =
    proje[worknumarasi].projetarihi;
  projeyanozellikleri.firstElementChild.children[1].children[1].textContent =
    proje[worknumarasi].katagorisi;
  projeyanozellikleri.firstElementChild.children[3].children[1].textContent =
    proje[worknumarasi].ulasimbilgisi;

  postaprojectmassage.addEventListener("click", function () {
    postmassage(proje[worknumarasi].basligi);
  });
});

//00000000000000000000000000000000000000000000000000//
//                eposta mesaj yonlendirme          //
//00000000000000000000000000000000000000000000000000//

postamassage.addEventListener("click", function () {
  postmassage(); // Butona tıklanınca fonksiyonu parametresiz çağır
});
function postmassage(projectname = "") {
  const name = nameinput.value;
  const msubject = subjectinput.value;
  const mesaj = mesajinput.value;

  const to = "alihameda417@gmail.com";
  const subject = projectname == "" ? msubject : "Aboute " + projectname;
  const body = `I am: ${name},${mesaj}`; // %0A = yeni satır

  const mailtoURL = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoURL;
}
