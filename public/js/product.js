console.log("SCRIPT CARGADO");

let count = 1;

const container = document.querySelector(".detail-card-container");
if (!container) {
  throw new Error("No se encontró el contenedor");
}

const stock = Number(container.dataset.stock);

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

async function addToCartDetail(cartId, productId, quantity = 1) {
  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

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
