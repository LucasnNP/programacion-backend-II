async function addToCart(cartId, productId, quantity = 1) {
  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Producto agregado al carrito");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
