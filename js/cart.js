let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from storage

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to storage
}

function addToCart(productName, productPrice, quantity) {
    console.log("Adding to cart:", productName, productPrice, quantity); // Debugging

    if (!productPrice) {
        console.error("❌ Product price is missing!");
        return; // Prevent adding invalid items
    }

    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    saveCart(); // Save the updated cart
    updateCartIcon(); // ✅ Update the cart icon immediately
}


function renderCart() {
    // Check if the current page is checkout.html
    if (window.location.pathname.includes("checkout.html")) {
        cart = JSON.parse(localStorage.getItem("cart")) || []; // Reload cart

        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";

        let total = 0;

        if (cart.length === 0) {
            document.getElementById("empty-cart-message").style.display = "block";
        } else {
            document.getElementById("empty-cart-message").style.display = "none";
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name}</p>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                <p>${itemTotal} lei</p>
            `;

            cartItems.appendChild(cartItem);
        });

        document.getElementById("cart-total").textContent = total;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartIcon();
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Coșul este gol! Adaugă produse înainte de a finaliza comanda.");
                return;
            }

            // Clear the cart and save the change
            cart = [];
            saveCart();
            alert("Comanda finalizată!");
            renderCart();
            window.location.href = "multumim.html"; // Redirect to a confirmation page
        });
    }
});

// Run this function only when necessary
document.addEventListener("DOMContentLoaded", () => {
    // Check if the page has the cart icon to update
    const cartIcon = document.getElementById("cart-count");
    if (cartIcon) {
        updateCartIcon();  // Update cart icon quantity on pages where it's needed
    }
});

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log(totalQuantity);  // Log inside the function
    const cartIcon = document.getElementById("cart-icon-quantity");
    if (cartIcon) {
        cartIcon.textContent = totalQuantity;
    }
}
