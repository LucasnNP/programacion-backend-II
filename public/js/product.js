console.log("SCRIPT CARGADO");

let count = 1;

const container = document.querySelector(".product-detail");
if (!container) {
  console.error(`No se encontró el contenedor`);
}

const stock = Number(container.dataset.stock);

const productId = container.dataset.id;

const quantityEl = document.getElementById("quantity");

function addQuantity() {
  console.log("click +");
  if (count < stock) {
    count++;
    quantityEl.textContent = count;
  }
}

function decreaseQuantity() {
  console.log("click -");
  if (count > 1) {
    count--;
    quantityEl.textContent = count;
  }
}

async function addToCartDetail() {
  try {
    let cartId = localStorage.getItem("cart-id-my-ecommerce");
    if (!cartId) {
      console.log("cartId:", cartId);
      const response = await fetch("http://localhost:8080/api/carts", {
        method: "POST",
      });
      const data = await response.json();
      cartId = data.payload._id;
      localStorage.setItem("cart-id-my-ecommerce", cartId);
    }
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: count }),
      },
    );

    const data = await response.json();
    if (response.ok) {
      alert("Producto agregado correctamente");
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
