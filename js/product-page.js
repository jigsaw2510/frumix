// document.addEventListener("DOMContentLoaded", function () {
//   const thumbnails = document.querySelectorAll(".thumbnail");
//   const mainImage = document.getElementById("main-image");

//   if (thumbnails && mainImage) {
//     thumbnails.forEach((thumbnail) => {
//       thumbnail.addEventListener("click", () => {
//         mainImage.src = thumbnail.src;
//       });
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        document.querySelector(".product-page").innerHTML = "<p>Produsul nu a fost găsit.</p>";
        return;
    }

    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);

            if (!product) {
                document.querySelector(".product-page").innerHTML = "<p>Produsul nu a fost găsit.</p>";
                return;
            }

            // Update the page with product data
            document.getElementById("product-title").textContent = product.name;
            document.getElementById("product-price").textContent = `Pret: ${product.price} ${product.currency}`;
            document.getElementById("product-material").textContent = `Material: ${product.material}`;
            document.getElementById("product-dimensions").textContent = `Dimensiuni: ${product.dimensions}`;
            document.getElementById("product-thickness").textContent = `Grosime: ${product.thickness}`;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-shipping").textContent = product.shipping;

            // Update images
            const mainImage = document.getElementById("main-image");
            mainImage.src = product.images[0];

            const thumbnailsContainer = document.querySelector(".thumbnails");
            thumbnailsContainer.innerHTML = ""; // Clear existing thumbnails

            product.images.forEach(image => {
                const img = document.createElement("img");
                img.src = image;
                img.alt = "Thumbnail";
                img.classList.add("thumbnail");
                img.addEventListener("click", () => {
                    mainImage.src = image;
                });
                thumbnailsContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error loading products:", error));
});

// Quantity selector functionality

document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.querySelector(".quantity-btn.minus");
    const plusBtn = document.querySelector(".quantity-btn.plus");
    const quantityInput = document.getElementById("quantity");

    minusBtn.addEventListener("click", function () {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener("click", function () {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
});
