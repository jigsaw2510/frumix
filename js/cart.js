let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from storage

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to storage
}

// Function to remove a specific item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item at the given index
    saveCart(); // Save the updated cart
    renderCart(); // Re-render the cart
    updateCartIcon(); // Update the cart icon
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

// Function to clear the entire cart
function clearCart() {
    cart = []; // Empty the cart array
    saveCart(); // Save the empty cart to localStorage
    renderCart(); // Update the cart display
    updateCartIcon(); // Update the cart icon
}

// Function to render the cart contents
function renderCart() {
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
                <p>${item.name} x ${item.quantity} buc.</p>
                <p>${itemTotal} lei</p>
                <button class="remove-item" data-index="${index}">❌</button>
            `;

            cartItems.appendChild(cartItem);
        });

        document.getElementById("cart-total").textContent = total;

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                removeFromCart(index);
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartIcon();

    const checkoutButton = document.getElementById("checkout-button");
    const cartDataInput = document.getElementById("cart-data");
    const clearCartButton = document.getElementById("clear-cart-button");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", (e) => {
            e.preventDefault();

            const firstName = document.getElementById("first-name");
            const lastName = document.getElementById("last-name");
            const phoneNumber = document.getElementById("phone");
            const emailAddress = document.getElementById("email");
            const deliveryAddress = document.getElementById("address");

            let isFormValid = true;
            let errorMessage = "";

            if (!firstName.value.trim()) {
                isFormValid = false;
                errorMessage += "Vă rugăm să completați câmpul Nume.\n";
            }
            if (!lastName.value.trim()) {
                isFormValid = false;
                errorMessage += "Vă rugăm să completați câmpul Prenume.\n";
            }
            if (!phoneNumber.value.trim()) {
                isFormValid = false;
                errorMessage += "Vă rugăm să completați câmpul Număr de telefon.\n";
            }
            if (!emailAddress.value.trim()) {
                isFormValid = false;
                errorMessage += "Vă rugăm să completați câmpul Adresă de email.\n";
            }
            if (!deliveryAddress.value.trim()) {
                isFormValid = false;
                errorMessage += "Vă rugăm să completați câmpul Adresă de livrare.\n";
            }

            if (!isFormValid) {
                alert(errorMessage);
                return;
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailAddress.value.trim())) {
                alert("Vă rugăm să introduceți o adresă de e-mail validă.");
                return;
            }

            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phoneNumber.value.trim())) {
                alert("Vă rugăm să introduceți un număr de telefon valid.");
                return;
            }

            const cartEmpty = JSON.parse(localStorage.getItem("cart")) || [];
            if (cartEmpty.length === 0) {
                alert("Coșul este gol! Adaugă produse înainte de a finaliza comanda.");
                return;
            }

            cartDataInput.value = JSON.stringify(cart);

            cart = [];
            saveCart();
            alert("Comanda finalizată!");
            renderCart();
            window.location.href = "multumim.html";

            document.querySelector("form").submit();
        });
    }

    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            if (confirm("Sigur doriți să goliți coșul?")) {
                clearCart();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-count");
    if (cartIcon) {
        updateCartIcon();
    }
});

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.getElementById("cart-icon-quantity");
    if (cartIcon) {
        cartIcon.textContent = totalQuantity;
    }
}
