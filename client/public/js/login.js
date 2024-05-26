document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const messageContainer = document.getElementById("message");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = "/";
        // Almacenar indicador de inicio de sesión
        sessionStorage.setItem("LoggedIn", "true");
      } else {
        const data = await response.json();
        alert("Hubo un error al iniciar sesión");
        // Limpiar campos del formulario en caso de error
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al conectar con el servidor");
    }
  });
});
