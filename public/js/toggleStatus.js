document.querySelectorAll(".btn-toggle-status").forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.dataset.id;
    const status = button.dataset.status === "true";

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      location.reload();
    } catch (error) {
      alert(error.message);
    }
  });
});
