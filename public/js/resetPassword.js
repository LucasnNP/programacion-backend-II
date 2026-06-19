const form = document.getElementById("resetPasswordForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = window.location.pathname.split("/").pop();

  const password = form.password.value;

  const response = await fetch(`/api/sessions/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const result = await response.json();

  alert(result.message);

  if (response.ok) {
    window.location.href = "/login";
  }
});
