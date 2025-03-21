document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "./images/banner-tablouri-canvas-1920x586.jpg",
    "./images/banner-tablouri-lemn-1920x586.jpg",
    "./images/banner-coastere-1920x586.jpg",
  ];
  const banner = document.getElementById("banner");
  let currentImageIndex = 0;

  if (banner) {
    setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      banner.style.opacity = 0;
      setTimeout(() => {
        banner.src = images[currentImageIndex];
        banner.style.opacity = 1;
      }, 1000);
    }, 3000);
  }
});
