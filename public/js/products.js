async function addToCart(productId) {
  try {
    let cartId = localStorage.getItem("cart-id-my-ecommerce");

    // crear carrito si no existe
    if (!cartId) {
      const res = await fetch("http://localhost:8080/api/carts", {
        method: "POST",
      });

      const data = await res.json();
      cartId = data.payload._id;

      localStorage.setItem("cart-id-my-ecommerce", cartId);
    }

    // agregar producto
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
      },
    );

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
