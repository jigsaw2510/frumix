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

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target; // Get the specific image that entered the viewport
                    img.classList.add("animate");

                    // Remove the class after animation ends to allow repeat animation
                    img.addEventListener('animationend', () => {
                        img.classList.remove("animate");
                    }, { once: true }); // Ensures the event fires only once per animation
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the image is visible

        images.forEach(img => observer.observe(img)); // Observe each image individually
    });
