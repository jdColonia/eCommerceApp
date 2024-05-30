document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");

  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(productForm);

    try {
      const response = await fetch("/add_product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Hubo un error al registrar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al conectar con el servidor");
    }
  });
});
