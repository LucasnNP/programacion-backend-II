// Se inicia la conexión con el servidor desde el cliente
const socket = io();

const deleteProduct = (productId) => {
  socket.emit("delete product", { productId });
};

socket.on("product list", ({ products }) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src=${product.thumbnail}>
        <h2>${product.title}</h2>
        <p>Precio: $${product.price}</p>
        <button onclick="deleteProduct('${product.id}')">Eliminar</button>
    `;

    productList.appendChild(card);
  });
});

//Formulario para agregar un nuevo producto
const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(productForm);

  const response = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    productForm.reset();
    socket.emit("new product");
  }
});
