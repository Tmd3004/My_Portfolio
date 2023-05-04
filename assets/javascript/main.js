const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Show Menu
const navMenu = $("#nav__menu"),
  navToggle = $("#nav__toggle"),
  navClose = $("#nav__close"),
  navLinks = $$(".nav__menu-link"),
  contactForm = $("#contact__form"),
  contactName = $("#contact-name"),
  contactEmail = $("#contact-email"),
  contactProject = $("#contact-project"),
  contactMessage = $("#contact__message");

// Menu Show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Hidden Menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const handleClickLink = () => {
  navMenu.classList.remove("show-menu");
};

navLinks.forEach((link) => link.addEventListener("click", handleClickLink));

// Swiper project
let swiperProjects = new Swiper(".projects__container", {
  loop: true,
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

// Email Js
const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactProject.value === ""
  ) {
    contactMessage.classList.remove("success");
    contactMessage.classList.add("error");

    contactMessage.textContent = "Write all the input fields";
  } else {
    // serviceID - templateID - #form - publicKey
    emailjs
      .sendForm(
        "service_8zqq66z",
        "template_rrukuzx",
        "#contact__form",
        "a9ormJPMqm0k1OUUg"
      )
      .then(
        () => {
          contactMessage.classList.add("success");
          contactMessage.textContent = "Message sent";

          setTimeout(() => {
            contactMessage.textContent = "";
          }, 3000);
        },
        (err) => {
          alert("OOPS! SOMETHING HAS FAILED...", err);
        }
      );

    contactProject.value = "";
    contactEmail.value = "";
    contactName.value = "";
  }
};

contactForm.addEventListener("submit", sendEmail);

// scroll sections active link
const sections = $$("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

// Show scroll up
const scrollUp = () => {
  const scrollUp = $("#scroll-up");
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll-up")
    : scrollUp.classList.remove("show-scroll-up");
};
window.addEventListener("scroll", scrollUp);

// Dark Light Theme
const themeButton = $("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-fill" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-fill" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// CHANGE BACKGROUND HEADER
const scrollHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400
})

sr.reveal(`.home__data, .projects__container, .footer__container`)
sr.reveal(`.home__info div`, { delay: 600, origin: 'bottom', interval: 100 })
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, { origin: 'left' })
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, { origin: 'right' })
sr.reveal(`.qualification__content, .services__card`, {interval: 100})
