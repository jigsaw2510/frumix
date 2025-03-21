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
            document.getElementById("product-price").textContent = `${product.price} lei`;
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

// Add to cart logic

document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.getElementById("add-to-cart");
    const quantityInput = document.getElementById("quantity");

    if (!addToCartButton || !quantityInput) return;

    addToCartButton.addEventListener("click", function () {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const product = {
            name: document.getElementById("product-title").textContent,
            price: parseFloat(document.getElementById("product-price").textContent.replace(" lei", "")),
            quantity: parseInt(quantityInput.value),
            image: document.getElementById("main-image").src // Optional: store product image
        };

        // Check if the product already exists in cart
        const existingProduct = cart.find((item) => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count in navbar
        updateCartCount();
        alert("Produs adăugat în coș!");
    });

    function updateCartCount() {
        const cartCount = document.querySelector(".cart-count");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    updateCartCount(); // Refresh count on page load
});
