document.querySelectorAll(".toggle-dropdown").forEach((button) => {
  button.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      const dropdownContent = button.parentElement.nextElementSibling;

      if (dropdownContent && dropdownContent.classList.contains("dropdown-content-bottom")) {
        dropdownContent.classList.toggle("show");
      }
    }
  });
});
