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

// Rotating images
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".rotating-image");

    if (!("IntersectionObserver" in window)) {
        console.warn("IntersectionObserver not supported. Running fallback.");
        images.forEach(img => img.classList.add("animate"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add("animate");

                img.addEventListener('animationend', () => {
                    img.classList.remove("animate");
                }, { once: true });
            }
        });
    }, { threshold: 0.5 });

    images.forEach(img => observer.observe(img));
});
