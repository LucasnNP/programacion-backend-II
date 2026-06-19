const form = document.getElementById("forgotPasswordForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;

  const response = await fetch("/api/sessions/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  alert(result.message);

  if (response.ok) {
    window.location.href = "/login";
  }
});
