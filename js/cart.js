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
                <p>${item.name} x ${item.quantity} buc.</p>
                <p>${itemTotal} lei</p>
            `;

            cartItems.appendChild(cartItem);
        });

        document.getElementById("cart-total").textContent = total;
    }
}



// document.addEventListener("DOMContentLoaded", () => {
//     renderCart();
//     updateCartIcon();

//     const checkoutButton = document.getElementById("checkout-button");
//     if (checkoutButton) {
//         checkoutButton.addEventListener("click", () => {

//             // Prevent the form from submitting and page from refreshing
//             event.preventDefault();

//             // Get the form fields
//             const firstName = document.getElementById("first-name");
//             const lastName = document.getElementById("last-name");
//             const phoneNumber = document.getElementById("phone");
//             const emailAddress = document.getElementById("email");
//             const deliveryAddress = document.getElementById("address");

//             // Check if any of the fields are empty
//             let isFormValid = true;
//             let errorMessage = "";

//             if (!firstName.value.trim()) {
//                 isFormValid = false;
//                 errorMessage += "Vă rugăm să completați câmpul Nume.\n";
//             }
//             if (!lastName.value.trim()) {
//                 isFormValid = false;
//                 errorMessage += "Vă rugăm să completați câmpul Prenume.\n";
//             }
//             if (!phoneNumber.value.trim()) {
//                 isFormValid = false;
//                 errorMessage += "Vă rugăm să completați câmpul Număr de telefon.\n";
//             }
//             if (!emailAddress.value.trim()) {
//                 isFormValid = false;
//                 errorMessage += "Vă rugăm să completați câmpul Adresă de email.\n";
//             }
//             if (!deliveryAddress.value.trim()) {
//                 isFormValid = false;
//                 errorMessage += "Vă rugăm să completați câmpul Adresă de livrare.\n";
//             }

//             // If the form is not valid, show the error message
//             if (!isFormValid) {
//                 alert(errorMessage);
//                 return;
//             }

//             // Additional validation for email and phone format
//             const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//             if (!emailRegex.test(emailAddress.value.trim())) {
//                 alert("Vă rugăm să introduceți o adresă de e-mail validă.");
//                 return;
//             }

//             const phoneRegex = /^[0-9]+$/;
//             if (!phoneRegex.test(phoneNumber.value.trim())) {
//                 alert("Vă rugăm să introduceți un număr de telefon valid.");
//                 return;
//             }

//             // Check if there are products in the cart
//             if (cart.length === 0) {
//                 alert("Coșul este gol! Adaugă produse înainte de a finaliza comanda.");
//                 return;
//             }

//             // If all fields are valid, proceed with the checkout process
//             cart = [];
//             saveCart();
//             alert("Comanda finalizată!");
//             renderCart();
//             window.location.href = "multumim.html"; // Redirect to a confirmation page
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartIcon();
    const checkoutButton = document.getElementById("checkout-button");
    const cartDataInput = document.getElementById("cart-data");

    checkoutButton.addEventListener("click", (e) => {
        // Prevent form submission initially to validate fields
        e.preventDefault();

        // Collect form data
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const phoneNumber = document.getElementById("phone");
        const emailAddress = document.getElementById("email");
        const deliveryAddress = document.getElementById("address");

        // Check if any of the fields are empty
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

        // If the form is not valid, show the error message
        if (!isFormValid) {
            alert(errorMessage);
            return;
        }

        // Additional validation for email and phone format
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

        // Check if there are products in the cart
        const cartEmpty = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartEmpty.length === 0) {
            alert("Coșul este gol! Adaugă produse înainte de a finaliza comanda.");
            return;
        }

        // Populate the hidden input field with the cart data (as JSON)
        cartDataInput.value = JSON.stringify(cart);

        // If all fields are valid, proceed with the checkout process
        cart = [];
        saveCart();
        alert("Comanda finalizată!");
        renderCart();
        window.location.href = "multumim.html"; // Redirect to a confirmation page

        // Now submit the form
        document.querySelector("form").submit();
    });
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
    const cartIcon = document.getElementById("cart-icon-quantity");
    if (cartIcon) {
        cartIcon.textContent = totalQuantity;
    }
}
