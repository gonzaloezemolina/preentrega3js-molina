const carrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
const carritoVacio = document.querySelector("#carrito__vacio");
let carritoProductos = document.querySelector("#carrito__productos");
const carritoAcciones = document.querySelector("#carrito__acciones");
const carritoComprado = document.querySelector("#carrito__comprado");
let

if (productosEnCarrito) {
    carritoVacio.classList.add("disabled")
    carritoProductos.classList.remove("disabled")
    carritoAcciones.classList.remove("disabled")
    carritoComprado.classList.add("disabled")
    

    carritoProductos.innerHTML="";

    carrito.forEach(producto => {



        const div = document.createElement("div");
        div.classList.add("carrito__productos")
        div.innerHTML = `
    <img class="carrito__producto__img" src="${producto.imagen}">
    <div class="carrito__producto__titulo">
        <small>Nombre</small>
        <h3>${producto.titulo}</h3>
    </div>
<div class="carrito__producto__cantidad">
    <small>Cantidad</small>
    <p>${producto.cantidad}</p>
</div>
<div class="carrito__producto__precio">
<small>Precio</small>
<p>$${producto.precio}</p>
</div>
<div class="carrito__producto__subtotal">
    <small>Subtotal</small>
    <p>$${producto.precio * producto.cantidad}</p>
</div>
<button class="carrito__producto__eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
    `
    });



    carritoProductos.append(div);
}






// Eliminar producto
function eliminarProducto(e) {
    const idBoton = e.currentTarget.id;
    const index = carrito.findIndex(producto => producto.id === idBoton)

    carrito.splice(index,1);
    cargarProductos();

    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
}

carritoVacio.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    carrito.legnth = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(carrito));
    cargarProductos();

}