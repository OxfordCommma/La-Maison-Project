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


//-------------------------------------------------------------

//Capta Item de localStorage, transforma de JSON a array y guarda en  variable O guarda array vacío
let arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];

//Clase Productos
class Productos {
    constructor(id, nombre, precio, tipo, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.imagen = imagen;
    }
};

// Guarda 2 elementos del HTML Tienda
const contendor = document.getElementById("contendorProductos");
const menu = document.getElementById("menu");

// Función 1: Toma un producto y lo retorna moldeado en un contenedor
function crearProductoElemento(producto, estaEnCarrito = false) {
    const productoContenedor = document.createElement("div");
    productoContenedor.className = "producto";

    const productoImagen = document.createElement("img");
    productoImagen.src = producto.imagen;
    productoImagen.className = "productoImagen";

    const productoDetalles = document.createElement("div");
    productoDetalles.className = "productoDetalles";

    const productoTitulo = document.createElement("h1");
    productoTitulo.textContent = producto.nombre;
    productoTitulo.className = "productoTitulo";

    const productoPrecio = document.createElement("h2");
    productoPrecio.textContent = producto.precio;
    productoPrecio.className = "productoPrecio";

    const productoTipo = document.createElement("p");
    productoTipo.textContent = producto.tipo;
    productoTipo.className = "productoTipo";

    productoDetalles.appendChild(productoTitulo);
    productoDetalles.appendChild(productoTipo);
    productoDetalles.appendChild(productoPrecio);

    // Si el producto esta dentro del Carrito, crea un boton para eliminarlo del mismo y lo incluye en el contenedor detalles
    if (estaEnCarrito) {
        const productoEliminar = document.createElement("button");
        productoEliminar.textContent = "Eliminar";
        productoEliminar.className = "productoEliminar";

        //Eventos que borran el producto (otra funcion se encarga), y una ventana de confirmacion con Toastify
        productoEliminar.onclick = () => eliminarDelCarrito(producto.id);
        productoEliminar.addEventListener('click', () => {
            Toastify({
                text: "Producto eliminado del carrito",
                duration: 3000,
                style: {
                    background: '#f44336',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '15px',
                    fontSize: '16px'
                }
            }).showToast();
        });
        productoDetalles.appendChild(productoEliminar);
    }

    // Si el producto no esta en el Carrito, crea un boton para añadirlo en el mismo y lo incluye en el contenedor detalles
    else {
        const productoAgregar = document.createElement("button");
        productoAgregar.textContent = "Agregar";
        productoAgregar.className = "productoAgregar";

        //Eventos que añaden el producto (otra funcion se encarga), y una ventana de confirmacion con Toastify
        productoAgregar.onclick = () => agregarAlCarrito(producto.id);
        productoAgregar.addEventListener('click', () => {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                style: {
                    background: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '15px',
                    fontSize: '16px'
                }
            }).showToast();
        });
        productoDetalles.appendChild(productoAgregar);
    }

    // Junta imagen y detalles del producto en un solo contenedor que será retornado
    productoContenedor.appendChild(productoImagen);
    productoContenedor.appendChild(productoDetalles);

    return productoContenedor;
}

// Función 2: invoca Función 1 y pasa como parámetro 1 producto. Lo retornado (contenedor del producto) Lo añade al contenedor padre
function todosLosProductos(producto) {
    const productoElemento = crearProductoElemento(producto);
    contendorProductos.appendChild(productoElemento);
}

// Como
arrayProductos.forEach(el => todosLosProductos(el));

// Función que limpia al contenedor padre, y dependiendo el argumento (1, 2 o 3), muestra parcialmente los productos
const botonesProductosFiltrados = tipo => {
    contendor.innerHTML = "";
    const productos = tipo === 1 ? arrayProductos : tipo === 2 ? arrayProductos.slice(0, 8) : tipo === 3 ? arrayProductos.slice(8, 16) : [];
    productos.forEach(el => todosLosProductos(el));
}

// Función que suma un producto al carrito
function agregarAlCarrito(productoId) {
    const productoElegido = arrayProductos.find(el => el.id === productoId);
    if (productoElegido) {
        const nuevoProducto = new Productos(productoElegido.id, productoElegido.nombre, productoElegido.precio, productoElegido.tipo, productoElegido.imagen);
        arrayCarrito.push(nuevoProducto);
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    };
};

// Función que elimina un producto del carrito
function eliminarDelCarrito(productoId) { 
    const objetoAEliminar = arrayCarrito.find(el => el.id === productoId);
    if (objetoAEliminar) {
        const indiceAEliminar = arrayCarrito.indexOf(objetoAEliminar);
        arrayCarrito.splice(indiceAEliminar, 1);
        localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
        mostrarCarrito();
    } 
}

// Función que muestra el carrito
function mostrarCarrito() {
    contendorProductos.innerHTML = "";
    if (arrayCarrito.length > 0) {
        arrayCarrito.forEach(producto => {
            const productoElemento = crearProductoElemento(producto, true);
            contendorProductos.appendChild(productoElemento);
        });
    } else {
        contendorProductos.textContent = "Tu carrito está vacío :(";
    }
}

//
function agregarEventoBotones(){
    const botonesDelMenu = document.querySelectorAll(".botonCategoria");
    botonesDelMenu.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesDelMenu.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
        });
    });
}

const boton1 = document.createElement("button");
boton1.innerHTML = `<i class="bi bi-arrow-90deg-right"></i></i>Todos los productos</li>`;
boton1.className = "botonMenu botonCategoria";
boton1.onclick = () => botonesProductosFiltrados(1);

const boton2 = document.createElement("button");
boton2.innerHTML = `<i class="bi bi-arrow-right-circle"></i>Portadas Peliculas</li>`;
boton2.className = "botonMenu botonCategoria";
boton2.onclick = () => botonesProductosFiltrados(2);

const boton3 = document.createElement("button");
boton3.innerHTML = `<i class="bi bi-arrow-right-circle"></i>Portadas Musica</li>`;
boton3.className = "botonMenu botonCategoria";
boton3.onclick = () => botonesProductosFiltrados(3);

const boton4 = document.createElement("button");
boton4.innerHTML = `<i class="bi bi-box"></i> Carrito</li>`;
boton4.className = "botonMenu botonCategoria";
boton4.onclick = () => mostrarCarrito();

menu.appendChild(boton1);
menu.appendChild(boton2);
menu.appendChild(boton3);
menu.appendChild(boton4);

agregarEventoBotones();