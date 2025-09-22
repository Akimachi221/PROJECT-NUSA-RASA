// ===================== Navbar & Overlay =====================
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    const overlay = document.querySelector(".overlay");
    nav.classList.toggle("show");
    overlay.classList.toggle("show");
}

// ===================== Modal Detail Menu =====================
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const span = document.querySelector(".close");
const addToCartBtn = document.getElementById("addToCartBtn");

let currentItem = null;
let cart = []; // array penyimpanan item keranjang

// Klik menu-card → buka modal
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
        let price = parseInt(card.dataset.price.replace(/[^0-9]/g, ""));

        modalTitle.textContent = `${card.dataset.name} - Rp ${price.toLocaleString()}`;
        modalImg.src = card.querySelector('img').src;
        modalDesc.textContent = card.dataset.desc || "Tidak ada deskripsi.";

        currentItem = {
            name: card.dataset.name,
            price: price
        };

        modal.style.display = 'flex';
    });
});

// Tambah ke keranjang
addToCartBtn.addEventListener('click', () => {
    if (currentItem) {
        cart.push(currentItem);
        updateCartUI();
        modal.style.display = 'none';
    }
});

// Tutup modal detail
span.addEventListener('click', () => {
    modal.style.display = 'none';
});

// ===================== Cart System =====================
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function toggleCart() {
    cartModal.style.display = (cartModal.style.display === "flex") ? "none" : "flex";
}

function updateCartUI() {
    // Update list item
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;

        // Tombol hapus per item
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCartUI();
        };

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
        total += item.price;
    });

    // Update total dan counter
    cartTotal.textContent = `Total: Rp ${total.toLocaleString()}`;
    cartCount.textContent = cart.length;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Terima kasih sudah belanja!\nTotal belanja Anda Rp ${total.toLocaleString()}`);

    // Reset keranjang
    cart = [];
    updateCartUI();
    toggleCart();
}
