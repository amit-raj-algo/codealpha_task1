let currentIndex = 0;
let images = [];

function openLightbox(img) {
  const gallery = document.getElementById("gallery");
  images = Array.from(gallery.querySelectorAll("img")).filter(el => el.style.display !== "none");
  currentIndex = images.indexOf(img);

  document.getElementById("lightbox-img").src = img.src;
  document.getElementById("lightbox").classList.remove("zoomed");
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

function filterImages(category) {
  const gallery = document.getElementById("gallery");
  const allImages = gallery.querySelectorAll("img");
  allImages.forEach(img => {
    const match = category === "all" || img.dataset.category === category;
    img.style.display = match ? "block" : "none";
  });
  searchImages(); // also apply search filter after category change
}

function searchImages() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const gallery = document.getElementById("gallery");
  const allImages = gallery.querySelectorAll("img");

  allImages.forEach(img => {
    const altText = img.alt.toLowerCase();
    const matches = altText.includes(searchInput);
    if (img.style.display !== "none") {
      img.style.display = matches ? "block" : "none";
    }
  });
}

function toggleZoom(event) {
  const lightbox = document.getElementById("lightbox");
  if (event.target.id === "lightbox-img") {
    lightbox.classList.toggle("zoomed");
  }
}
