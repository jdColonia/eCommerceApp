document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

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
        const data = await response.json();
        window.location.href = "/";
        // Almacenar indicador de inicio de sesión
        sessionStorage.setItem("LoggedIn", "true");
        // Almacenar indicador de tipo de usuario logueado
        sessionStorage.setItem("UserRole", data.user.role === "admin" ? "admin" : "client");
        // Almacenar al usuario que está logueado
        sessionStorage.setItem("User", username);
      } else {
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
