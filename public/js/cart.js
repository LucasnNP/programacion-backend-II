async function addToCart(productId, quantity = 1) {
  try {
    let cartId = localStorage.getItem("cart-id-my-ecommerce");

    // crear carrito si no existe
    if (!cartId) {
      const res = await fetch("/api/carts", {
        method: "POST",
      });

      const data = await res.json();
      cartId = data.payload._id;

      localStorage.setItem("cart-id-my-ecommerce", cartId);
    }

    // agregar producto
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

function goToCart() {
  const cartId = localStorage.getItem("cart-id-my-ecommerce");

  if (!cartId) {
    alert("No tenés un carrito creado todavía");
    return;
  }

  window.location.href = `/carts/${cartId}`;
}
