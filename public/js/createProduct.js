const form = document.getElementById("createProductForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Producto creado correctamente");
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error al crear el producto");
      console.error(error);
    }
  });
}
