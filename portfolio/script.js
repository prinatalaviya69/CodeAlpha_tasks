const sections = document.querySelectorAll(".fade-in");

function showSections() {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showSections);
window.addEventListener("load", showSections);

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
  form.reset();
});