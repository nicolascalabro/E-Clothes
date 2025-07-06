document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("carrito-contenedor");

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito esta vacio.</p>";
        return;
    }

    const ul = document.createElement("ul");
    let total = 0;

    carrito.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        ul.appendChild(li);
        precio = parseFloat(item.precio);
        total += precio;
    });

    const p = document.createElement("p");
    p.textContent = `Total: $${total}`;  

    contenedor.appendChild(ul); 
    contenedor.appendChild(p); 
    
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("tarjetaItems__boton");
    botonEliminar.textContent = "Vaciar carrito";
    botonEliminar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        contenedor.innerHTML = "<p>El carrito ha sido vaciado.</p>";
    });

    contenedor.appendChild(botonEliminar);
});
