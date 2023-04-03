
//Array de productos
const productos = [
    {
        id: "Proteina 1",
        titulo: "Proteina SPX",
        imagen: "./img/SPX400X500ssss.webp",
        categoria: {
            nombre: "Proteinas",
            id: "proteinas"
        },
        precio: 4899
    },
    {
        id: "Creatina 1",
        titulo: "Creatina Ultratech",
        imagen: "./img/creaultratechiseno-sin-titulo-551-ac00f32a85bf7388ee16222443092590-640-0.webp",
        categoria: {
            nombre: "Creatinas",
            id: "creatinas"
        },
        precio: 6299
    },
    {
        id: "Creatina 2",
        titulo: "Creatina Growth",
        imagen: "./img/creagrowthd_980582-mla48924358352_012022-o-a501d946054e728f7316578969011246-640-0.webp",
        categoria: {
            nombre: "Creatinas",
            id: "creatinas"
        },
        precio: 4699
    },
    {
        id: "Preworkout 1",
        titulo: "Preworkout Nutrend",
        imagen: "./img/prewnutrendn1_510g_blueraspberry-2022.jpg",
        categoria: {
            nombre: "Preworkout",
            id: "preworkout"
        },
        precio: 3790
    },
    {
        id: "Preworkout 2",
        titulo: "Preworkout Star",
        imagen: "./img/preworkoutstartD_NQ_NP_826798-MLA42642002810_072020-V.jpg",
        categoria: {
            nombre: "Preworkout",
            id: "preworkout"
        },
        precio: 4190
    },
    {
        id: "Mass Gainer 1",
        titulo: "Mass gainer SPX",
        imagen: "./img/gainer.jpg",
        categoria: {
            nombre: "Mass Gainer",
            id: "gainer"
        },
        precio: 4050
    },
    {
        id: "Straps 1 ",
        titulo: "Straps Balboa",
        imagen: "./img/straps1_800.jpg",
        categoria: {
            nombre: "Straps",
            id: "straps"
        },
        precio: 4199
    },
    {
        id: "Cinturon 1",
        titulo: "Cinturon de cuero Balboa",
        imagen: "./img/cintobalboaD_NQ_NP_978144-MLA31115213308_062019-O.webp",
        categoria: {
            nombre: "Cinturon",
            id: "cinturon"
        },
        precio: 31200
    },
    {
        id: "Guantes 1",
        titulo: "Guantes ExtremeProyect",
        imagen: "./img/guantes-gym-fitness-extreme-proyec.jpg",
        categoria: {
            nombre: "Guantes",
            id: "guantes"
        },
        precio: 1290
    },
]


//Dom
const contenedorProductos = document.querySelector("#contenedor-productos")
let productoBotones = document.querySelectorAll(".producto__btn")
const carritoContainer = document.querySelector("#carrito-contenedor");
const contadorCarrito = document.querySelector("#contador__carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const precioTotal = document.querySelector('#precioTotal')
const eliminarProducto = document.querySelectorAll(".boton-eliminar")










// Inyectar las tarjetas al html. div con la class producto y las siguientes caracteristicas de la tarjeta de producto.
function cargarProductos() {

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `
    <img src="${producto.imagen}" class="producto__img">
    <div class="producto__descripcion">
        <h3 class="producto__tittle">${producto.titulo}</h3>
        <span class="producto__price">$${producto.precio}</span>
    </div>
    <button class="producto__btn" id="${producto.id}">Añadir al carrito</button>
</div>
    `;

        contenedorProductos.append(div);
    })
    btnProduct();
}

cargarProductos();

function btnProduct() {
    productoBotones = document.querySelectorAll(".producto__btn");

    productoBotones.forEach(boton => {
        boton.addEventListener("click", añadirAlCarrito);

    })
}


// Carrito array
const carrito = [];

// Funcion agregar al carrito array + cantidad + contador
function añadirAlCarrito(e) {
    const idBtn = e.currentTarget.id;
    const productoAdd = productos.find(producto => producto.id === idBtn);
    if (carrito.some(producto => producto.id === idBtn)) {
        const index = carrito.findIndex(producto => producto.id === idBtn)
        carrito[index].cantidad++;
    } else {
        productoAdd.cantidad = 1;
        carrito.push(productoAdd);
        cargarCarrito();
        console.log(carrito);
    }


    //Funcion para actualizar el contador del carrito
    function cantidadCarrito() {
        let contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
        contadorCarrito.innerText = contador;
    }
    cantidadCarrito();





    //Local Storage
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
}




// Funcion para inyectar productos en el carrito
const cargarCarrito = () => {
    carritoContainer.innerHTML = ""

    carrito.forEach((producto) => {
        const divCarrito = document.createElement('div')
        divCarrito.classList.add('productoEnCarrito')
        divCarrito.innerHTML = `
        <p>${producto.titulo}</p>
        <p>Precio:$${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button (${producto.id}) class="boton-eliminar"><i class="bi bi-trash-fill"></i></button>
        `

        carritoContainer.appendChild(divCarrito)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
}



//evento vaciar carrito
vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    cargarCarrito();
    console.log(carrito);
    //vaciar contador
    contadorCarrito.innerHTML = 0
})



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        cargarCarrito();
    }
})




