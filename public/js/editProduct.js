const form = document.getElementById("editProductForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productId = window.location.pathname.split("/").pop();

  const formData = Object.fromEntries(new FormData(form));

  const response = await fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (response.ok) {
    alert("Producto actualizado correctamente");
    window.location.href = "/admin";
  } else {
    alert(result.message);
  }
});
