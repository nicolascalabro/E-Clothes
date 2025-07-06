let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
} 

function agregarProdAlCarrito(btn) {
    const tarjeta = btn.closest(".tarjetaItems");   //identifica la tarjeta del producto
    const nombre = tarjeta.querySelector(".tarjetaItems__descripcion").textContent;    
    const precioTexto = tarjeta.querySelector(".tarjetaItems__precio").textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9,]/g, "").replace(",", "."));
    carrito.push({nombre,precio});
    guardarCarrito();
    alert(`✅ ${nombre} agregado al carrito.`);
}

const botones = document.querySelectorAll(".tarjetaItems__boton__agregar");
botones.forEach((btn) => {
    btn.addEventListener("click", () => agregarProdAlCarrito(btn));
});