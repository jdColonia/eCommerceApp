document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        window.location.href = "/";
        // Almacenar indicador de inicio de sesión
        sessionStorage.setItem("LoggedIn", "true");
        // Almacenar indicador de tipo de usuario logueado
        sessionStorage.setItem("UserRole", role === "admin" ? "admin" : "client");
        // Almacenar al usuario que está logueado
        sessionStorage.setItem("User", username);
      } else {
        alert("Hubo un error al registrar el usuario");
        // Limpiar campos del formulario en caso de error
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("role").value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al conectar con el servidor");
    }
  });
});
