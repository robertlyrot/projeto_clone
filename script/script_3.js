const products = [
    { id: 1, name: "Pizza", description: "aeeiouaksaks.", price: 20.0, img: "/assets/pizza_vulcan.jpg" },
    { id: 2, name: "Batata Frita", description: "Batata frita sequinha e crocante.", price: 40.0, img: "/assets/batata_frita.jpg" },
    { id: 3, name: "Refrigerante", description: "Lata de refrigerante.", price: 5.0, img: "/assets/refrigerante.webp" },
];

const cupom = {
    DESCONTO10: 0.1,
    DESCONTO20: 0.2,
    ALUNOVICTOR: 0.3,
};

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const productsContainer = document.getElementById("produto");
const cartContainer = document.getElementById("items-carrinho");
const subtotalElement = document.getElementById("subtotal");
const discountElement = document.getElementById("desconto");
const totalElement = document.getElementById("total");
const couponInput = document.getElementById("cupom");
const aplicarCupom = document.getElementById("aplicar-desconto");

function renderProducts() {
    products.forEach(produto => {
        const produtoEl = document.createElement("div");
        produtoEl.className = "produto";
        produtoEl.innerHTML = `
            <img src="${produto.img}" alt="${produto.name}">
            <div>
                <h3>${produto.name}</h3>
                <p>${produto.description}</p>
                <p>R$ ${produto.price.toFixed(2)}</p>
            </div>
            <button class="adicionar" onclick="addToCart(${produto.id})">Adicionar ao Carrinho</button>
        `;
        productsContainer.appendChild(produtoEl);
    });
}

function renderCart() {
    cartContainer.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach(item => {
        subtotal += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <p>${item.name} x${item.quantity}</p>
            <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remover" onclick="removeFromCart(${item.id})">Remover</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const discount = parseFloat(discountElement.textContent) || 0;
    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = (subtotal - discount).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(carrinho));
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const item = carrinho.find(i => i.id === productId);

    if (item) {
        item.quantity++;
    } else {
        carrinho.push({ ...product, quantity: 1 });
    }

    renderCart();
}

function removeFromCart(productId) {
    carrinho = carrinho.filter(item => item.id !== productId);
    renderCart();
}

aplicarCupom.addEventListener("click", () => {
    const coupon = couponInput.value.trim().toUpperCase();
    const discount = cupom[coupon] || 0;

    if (discount) {
        const subtotal = parseFloat(subtotalElement.textContent);
        const discountValue = subtotal * discount;

        discountElement.textContent = discountValue.toFixed(2);
        totalElement.textContent = (subtotal - discountValue).toFixed(2);
    } else {
        alert("Cupom inválido!");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const voltarBtn = document.getElementById("voltar-inicio");
    if (voltarBtn) {
        voltarBtn.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    } else {
        console.log("Botão 'voltar-inicio' não encontrado");
    }
});

renderProducts();
renderCart();
