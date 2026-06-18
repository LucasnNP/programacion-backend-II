// Quitar producto
document.querySelectorAll(".btn-remove-product").forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.productId;

    const response = await fetch(`/api/carts/${CART_ID}/product/{productId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      location.reload();
    } else {
      alert(result.message);
    }
  });
});

// Vaciar carrito
const clearButton = document.getElementById("btn-clear-cart");

if (clearButton) {
  clearButton.addEventListener("click", async () => {
    const response = await fetch(`/api/carts/${CART_ID}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      location.reload();
    } else {
      alert(result.message);
    }
  });
}

// Comprar
const purchaseButton = document.getElementById("btn-purchase-cart");

if (purchaseButton) {
  purchaseButton.addEventListener("click", async () => {
    const response = await fetch(`/api/carts/${CART_ID}/purchase`, {
      method: "POST",
    });

    const result = await response.json();

    if (response.ok) {
      alert(
        `Compra realizada correctamente.\nCódigo ticket: ${result.ticket.code}`,
      );
      location.reload();
    } else {
      alert(result.message);
    }
  });
}
