const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const filterButtons = document.querySelectorAll(".filter-buttons button");

let currentIndex = 0;
let visibleImages = Array.from(images);

images.forEach((image, index) => {
  image.addEventListener("click", () => {
    visibleImages = Array.from(document.querySelectorAll(".gallery img:not(.hide)"));
    currentIndex = visibleImages.indexOf(image);
    openLightbox(image.src);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentIndex].src;
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-buttons .active").classList.remove("active");
    button.classList.add("active");

    const filter = button.dataset.filter;

    images.forEach((image) => {
      if (filter === "all" || image.dataset.category === filter) {
        image.classList.remove("hide");
      } else {
        image.classList.add("hide");
      }
    });
  });
});