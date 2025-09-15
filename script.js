function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("show");
}

// ambil elemen modal
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const span = document.querySelector(".close");

// ambil semua card
const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex"; // tampilkan modal
        const img = card.querySelector("img");

        // isi modal sesuai data di card
        modalImg.src = img.src;
        modalTitle.textContent = card.dataset.name + " - " + card.dataset.price;
        modalDesc.textContent = card.dataset.desc;
    });
});

// tombol close
span.onclick = () => {
    modal.style.display = "none";
};

// klik di luar modal untuk menutup
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};
