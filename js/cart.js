const buzosList = document.getElementById("buzosList");
const camperasList = document.getElementById("camperasList");
const btnViewCart = document.getElementById("btnViewCart");
localStorage.removeItem("cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

btnViewCart.addEventListener("click",viewCart);

async function getProducts() {
    try {
        const resp = await fetch("../products.json");
        if (!resp.ok) {
            throw new Error("Error al obtener los productos");
        }
        const data = await resp.json();
        displayProducts(data);
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
        });
    }
}

function displayProducts(data) {
    if (buzosList) {
        buzosList.innerHTML = "";
    }
    if (camperasList) {
        camperasList.innerHTML = "";
    }
    data.forEach((item) => {
        const productCard = document.createElement("div");
        productCard.classList.add("tarjetaItems");
        productCard.innerHTML = `
            <img class="tarjetaItems__img" src="${item.imageUrl}" alt="${item.description}">
            <h3 class="tarjetaItems__descripcion">${item.description}</h3> 
            <p class="tarjetaItems__precio">${item.price}</p>
            <p class="tarjetaItems__cuotas">${item.paymentMethod}</p>
            <button class="tarjetaItems__boton" data-id=${item.id}>Agregar al carrito</button>
            <i class="fa-solid fa-heart tarjetaItems__corazon"></i>
        `
        if (buzosList && item.category === "Buzos") {
            buzosList.appendChild(productCard);
        }
        if (camperasList && item.category === "Camperas") {
            camperasList.appendChild(productCard);
        }
    });

    const buttons = document.querySelectorAll(".tarjetaItems__boton");
    buttons.forEach((btn) => {
        btn.addEventListener("click", (evt) => {
            const productId = parseInt(evt.target.dataset.id);
            const productToAdd = data.find((item) => item.id === productId);
            if (productId) {
                addToCart(productToAdd);
            }
        });
    });
};

function addToCart(productToAdd) {
    const existingProduct = cart.find((item) => item.id === productToAdd.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    Toastify({
        text: `${productToAdd.description} agregado al carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        backgroundColor: "linear-gradient(to right,rgb(0, 73, 176),rgb(61, 171, 201))",
        stopFocus: true,
    }).showToast();
}

function viewCart(){
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Alerta',
            text: "El carrito esta vacio",
        });
        return;    
    }
    const ul = document.createElement("ul");
    let total = 0;
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.description} - $${item.price}`;
        ul.appendChild(li);
        //precio = parseFloat(item.precio);
        total += precio;
    });

    const p = document.createElement("p");
    p.textContent = `Total: $${total}`;



}



getProducts();