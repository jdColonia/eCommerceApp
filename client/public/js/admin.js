document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("product-form");

  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const image = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);

    alert(image);

    try {
      const response = await fetch("/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image, description, price, quantity }),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        alert("Hubo un error al registrar el producto");
        // Limpiar campos del formulario en caso de error
        document.getElementById("productName").value = "";
        document.getElementById("productImage").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al conectar con el servidor");
    }
  });
});
