const buzosList = document.getElementById("buzosList");
const camperasList = document.getElementById("camperasList");
const btnViewCart = document.getElementById("btnViewCart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

btnViewCart.addEventListener("click",viewCart);

async function getProducts() {
    try {
        let jsonPath = "../products.json"; 
        if (window.location.pathname.endsWith("index.html")){
            jsonPath = "./products.json";
        }
        const resp = await fetch(jsonPath);
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
            <p class="tarjetaItems__precio">$${item.price}</p>
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
        duration: 5000,
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

    let cartConteiner = '<ul style="list-style: none; padding: 0;">';
    let purchaseTotal = 0;

    cart.forEach((item)=> {
        const itemTotal = item.price * item.quantity;
        purchaseTotal += itemTotal;
        cartConteiner += `
        <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dotted #ccc; padding-bottom: 5px;">
        <span>${item.description} x ${item.quantity}</span>
        <span>$${itemTotal.toFixed(2)}<button class="delete-item-btn" data-id="${item.id}" style="background-color: #dc3545; color: white; border: none; border-radius: 3px; padding: 3px 8px; cursor: pointer; margin-left: 10px;">X</button></span>
        </li>`;
    });
    cartConteiner += `</ul>`;
    cartConteiner += `<p style="font-weight: bold; font-size: 1.2rem; text-align: right; margin-top: 20px;">Total: $${purchaseTotal.toFixed(2)}</p>`;
    Swal.fire({
        title: 'Carrito de Compras',
        html:  cartConteiner,
        width: 800,
        showCancelButton: true,
        confirmButtonText: 'Aceptar Compra',
        cancelButtonText: 'Volver',
        didOpen: () => {
        document.querySelectorAll(".delete-item-btn").forEach(btn => {
            btn.addEventListener("click", (evt) => {
                const idToDelete = parseInt(evt.target.dataset.id);
                removeFromCart(idToDelete);
            });
        });   
        }
    }).then((res) => {
        if(res.isConfirmed){
            Swal.fire({
                icon: "success",
                title: "Compra Exitosa",
                text: "Gracias por su compra en E-Clothes!"
            });
            cart = [];
            localStorage.removeItem("cart");
        }
    });
}

function removeFromCart(idToDelete){
   cart = cart.filter((item) => item.id != idToDelete);
   localStorage.setItem("cart", JSON.stringify(cart));
   viewCart();
}

getProducts();