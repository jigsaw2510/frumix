const cart = [
  { name: "Product 1", price: 50, quantity: 1 },
  { name: "Product 2", price: 100, quantity: 2 },
];

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name}</p>
      <input type="number" value="${item.quantity}" min="1" data-index="${index}">
      <p>${itemTotal} RON</p>
    `;
    cartItems.appendChild(cartItem);
  });

  document.getElementById("cart-total").textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  if (cartContainer) {
    cartContainer.addEventListener("change", (e) => {
      if (e.target.type === "number") {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity = parseInt(e.target.value);
        renderCart();
      }
    });

    renderCart();
  }
});
