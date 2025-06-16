const productos = ["Buzo", "Pantalón", "Campera"];
const precios = [50000, 45000, 90000];
let carrito = [];
let total = 0;

function mostrarProductos() {
    let lista = "Productos disponibles:\n";
    for (let i = 0; i < productos.length; i++) {
        lista = lista + `${i + 1}. ${productos[i]} - $${precios[i]}\n`;
    }
    console.log(lista);
}

function agregarAlCarrito(indice) {
    carrito.push(productos[indice]);
    total += precios[indice];
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
    } else {
        console.log("Productos en el carrito: " + carrito.join(", "));
        console.log("Total: $" + total);
    }
}

function simularCompra() {
    let seguir = true;

    while (seguir) {
        mostrarProductos();
        let eleccion = prompt("Ingrese el número del producto que desea comprar:");
        let indice = parseInt(eleccion) - 1;

        if (indice >= 0 && indice < productos.length) {
            agregarAlCarrito(indice);
            console.log("Producto agregado: " + productos[indice]);
        } else {
            console.log("Producto no válido.");
        }

        seguir = confirm("¿Desea seguir comprando?");
    }

    console.log("Gracias por su compra!");
    mostrarCarrito();
}
console.log("Bienvenido a E-Clothes!");
simularCompra();