document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      document.body.style.paddingTop = "80px";

      const hamburger = document.querySelector(".hamburger");
      const navBar = document.querySelector(".nav-bar");
      if (hamburger && navBar) {
        hamburger.addEventListener("click", () => {
          hamburger.classList.toggle("active");
          navBar.classList.toggle("active");
        });
      }

      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll(".nav-bar ul li a");

      navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
          link.classList.add("current-page");
        } else {
          link.classList.remove("current-page");
        }
      });
    });
});
