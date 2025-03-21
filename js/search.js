document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const products = document.querySelectorAll(".produs");

  if (searchBar && products) {
    searchBar.addEventListener("input", () => {
      const query = searchBar.value.toLowerCase();
      products.forEach((product) => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();
        product.style.display = productName.includes(query) ? "block" : "none";
      });
    });
  }
});
