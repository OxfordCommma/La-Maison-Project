// Función para obtener productos desde la API
async function obtenerProductos() {
    try {
        let respuesta = await fetch("https://fakestoreapi.com/products");
        let datos = await respuesta.json();
        console.log(datos);
        return datos.slice(0, 10); // Tomar solo los primeros 10 productos
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

// Función para agregar productos al contenedor
function agregarProductos(productos) {
    let contenedor = document.getElementById("contenedorProductos");
    
    productos.forEach(producto => {
        // Crear el contenedor general del producto
        let contenedorProducto = document.createElement("div");
        contenedorProducto.classList.add("producto");

        // Crear el contenedor de la imagen
        let imagenProducto = document.createElement("div");
        imagenProducto.classList.add("imagenProducto");
        let imagen = document.createElement("img");
        imagen.src = producto.image;
        imagen.alt = producto.title;
        imagenProducto.appendChild(imagen);

        // Crear el contenedor del título
        let tituloProducto = document.createElement("div");
        tituloProducto.classList.add("tituloProducto");
        tituloProducto.textContent = producto.title;

        let precioProducto = document.createElement("p");
        precioProducto.classList.add("precioProducto");
        precioProducto.textContent = "$" + producto.price;

        // Agregar los contenedores de imagen y título al contenedor general
        contenedorProducto.appendChild(imagenProducto);
        contenedorProducto.appendChild(tituloProducto);
        contenedorProducto.appendChild(precioProducto);

        // Agregar el contenedor general al contenedor principal
        contenedor.appendChild(contenedorProducto);
    });
}

// Función principal para cargar los productos al cargar la página
async function cargarProductos() {
    let productos = await obtenerProductos();
    if (productos) {
        agregarProductos(productos);
    }
}

// Ejecutar la función principal al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductos);
