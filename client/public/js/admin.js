// Función para cargar todos los productos desde el servidor
async function loadProducts() {
  try {
    const response = await fetch("/");
    const data = await response.json();
    // Mostrar los productos en la interfaz
    // Por ejemplo, podrías actualizar una tabla HTML con los productos obtenidos
    console.log("Productos:", data.products);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

// Función para agregar un nuevo producto al inventario
async function addProduct() {
  const name = document.getElementById("productName").value;
  const image = document.getElementById("productImage").value;
  const description = document.getElementById("productDescription").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const quantity = parseInt(document.getElementById("productQuantity").value);

  const newProduct = { name, image, description, price, quantity };

  try {
    const response = await fetch("/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    // Mostrar mensaje de éxito o cualquier otra lógica de manejo de respuesta
    console.log("Producto agregado:", data.product);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
  }
}

// Función principal para inicializar la página de administración
function initAdminPage() {
  // Asignar eventos a los botones
  document
    .getElementById("loadProductsBtn")
    .addEventListener("click", loadProducts);
  document
    .getElementById("addProductBtn")
    .addEventListener("click", addProduct);
}

// Inicializar la página de administración cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", initAdminPage);
