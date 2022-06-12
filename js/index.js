navToggleBTN = document.querySelector("#button-nav-toggle");
navbar = document.querySelector(".nav-menu");
navLinks = document.querySelectorAll(".nav-link");
scrollupBTN = document.querySelector("#button-scrollUp");
changeThemeBTN = document.querySelector("#button-changeTheme");

const windowEvents = ['load', 'resize'];
windowEvents.forEach(event => {
  window.addEventListener(event, () => {
    window.scrollTo({
      left: 0,
      top: 5,
    });
  })
})
// adjust navigation links and their positions

navToggleBTN.onclick = () => {
  navbar.classList.toggle("nav-menu-show");
};
// toggling navbar

window.addEventListener("resize", () => {
  if (window.screen.width >= 768) {
    navbar.classList.remove("nav-menu-show");
  }
});
// change from tablet size to laptop size makes an issue in navbar , solved it by window

navLinks.forEach((link) => {
  link.onclick = () => {
    navbar.classList.remove("nav-menu-show");
  };
});
// hide navbar while clicking on a link

window.addEventListener("scroll", () => {
  if (window.scrollY >= 98) {
    navbar.parentElement.classList.add("nav-changeBackground");
    scrollupBTN.classList.add("button-scrollUp-show");
  } else {
    navbar.parentElement.classList.remove("nav-changeBackground");
    scrollupBTN.classList.remove("button-scrollUp-show");
  }
  for (let a of navLinks) {
    const sectionName = a.getAttribute("href").slice(1);
    const section = document.getElementById(sectionName);
    const navbarHeight = navbar.getBoundingClientRect().height;
    const sectionHeight = section.getBoundingClientRect().height;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      let position = section.offsetTop - navbarHeight * 2;
      if (window.screen.width <= 768) {
        position = position + 480;
        if (navbar.parentElement.classList.contains("nav-changeBackground") &&
          a.getAttribute("href") == "#home") {
          position = position - 200;
        }
        else if (
          !navbar.parentElement.classList.contains("nav-changeBackground")
        ) {
          position = position + 220;
        }
      }
      if (!navbar.parentElement.classList.contains("nav-changeBackground")) {
        position = position - navbarHeight;
      }
      window.scrollTo({ left: 0, top: position });
    });
    let sectionTop = section.offsetTop - 200;
    if (
      window.scrollY > sectionTop &&
      window.scrollY <= sectionTop + sectionHeight
    ) {
      document
        .querySelector(`a[href='${a.getAttribute("href")}']`)
        .classList.add("nav-link-active");
    } else {
      document
        .querySelector(`a[href='${a.getAttribute("href")}']`)
        .classList.remove("nav-link-active");
    }
  }
});
// change navbar background color on scrolling down (y-axis)
// add a dot under active link

scrollupBTN.onclick = () => {
  window.location.href = "#";
};
// scroll to top

changeThemeBTN.onclick = () => {
  if (document.body.classList.contains("body-lightTheme")) {
    document.body.classList.add("body-darkTheme");
    document.body.classList.remove("body-lightTheme");
    changeThemeBTN.children[0].classList.add("bx-toggle-right");
    changeThemeBTN.children[0].classList.remove("bx-toggle-left");
  } else {
    document.body.classList.remove("body-darkTheme");
    document.body.classList.add("body-lightTheme");
    changeThemeBTN.children[0].classList.remove("bx-toggle-right");
    changeThemeBTN.children[0].classList.add("bx-toggle-left");
  }
};
// change website theme
// change the button's logo that responsible for changing theme
