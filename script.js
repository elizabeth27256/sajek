// ───────────────────────────────────────────
//   SAJEK & CONSTRUCCION — script.js
// ───────────────────────────────────────────

// ── Navbar: cambia opacidad al hacer scroll ──
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mainNav.style.background = 'rgba(13, 13, 13, 0.97)';
  } else {
    mainNav.style.background = 'rgba(13, 13, 13, 0.85)';
  }
});

// ── Animaciones reveal al hacer scroll ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// ── Smooth scroll para enlaces del menú ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Marcar enlace activo en el menú según sección visible ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, {
  threshold: 0.5
});

sections.forEach(section => sectionObserver.observe(section));

// ── MODAL DE SERVICIOS ──
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const modalIcon = document.getElementById("modalIcon");
const modalGallery = document.getElementById("modalGallery");

// ZOOM
const imgViewer = document.getElementById("imgViewer");
const imgViewerContent = document.getElementById("imgViewerContent");

// DATA DE SERVICIOS
const serviciosData = {
  pintura: {
    titulo: "Pintura",
    icono: "🎨",
    sub: "Trabajos de pintura realizados",
    imagenes: [
      "img/pintura1.jpeg",
      "img/pintura2.jpeg",
      "img/pintura3.jpeg",
      "img/pintura4.jpeg",
      "img/pintura5.jpeg",
      "img/pintura6.jpeg",
      "img/pintura7.jpeg",
      "img/pintura8.jpeg",
      "img/pintura9.jpeg",
      "img/pintura10.jpeg",
      "img/pintura11.jpeg",
      "img/pintura12.jpeg",
      "img/pintura13.jpeg",
      "img/pintura14.jpeg",
      "img/pintura15.jpeg",
    ]
  },
  carpinteria: {
    titulo: "Carpintería",
    icono: "🔨",
    sub: "Proyectos en madera",
    imagenes: [
      "img/carpinteria1.jpeg",
      "img/carpinteria2.jpeg",
      "img/carpinteria3.jpeg",
      "img/carpinteria4.jpeg",
      "img/carpinteria5.jpeg",
      "img/carpinteria6.jpeg",
      "img/carpinteria7.jpeg",
      "img/carpinteria8.jpeg",
      "img/carpinteria9.jpeg",
      "img/carpinteria10.jpeg",
      "img/carpinteria11.jpeg",
      "img/carpinteria12.jpeg",
      "img/carpinteria13.jpeg",
      "img/carpinteria14.jpeg",
      "img/carpinteria15.jpeg",
    ]
  },
  electricidad: {
    titulo: "Electricidad",
    icono: "⚡",
    sub: "Instalaciones eléctricas",
    imagenes: [
        "img/electricidad1.jpeg",
        "img/electricidad2.jpeg",
        "img/electricidad3.jpeg",
        "img/electricidad4.jpeg",
        "img/electricidad5.jpeg",
        "img/electricidad6.jpeg",
        "img/electricidad7.jpeg",
        "img/electricidad8.jpeg",
        "img/electricidad9.jpeg",
        "img/electricidad10.jpeg",
        "img/electricidad11.jpeg"
    ]
  },
  plomeria: {
    titulo: "Plomería",
    icono: "🚿",
    sub: "Trabajos hidráulicos",
    imagenes: [
      "img/plomeria1.jpeg",
      "img/plomeria2.jpeg"
    ]
  },
  gypsum: {
    titulo: "Gypsum",
    icono: "🧱",
    sub: "Diseños en gypsum",
    imagenes: [
        "img/gypsum1.jpeg",
        "img/gypsum2.jpeg",
        "img/gypsum3.jpeg",
        "img/gypsum4.jpeg",
        "img/gypsum5.jpeg",
        "img/gypsum6.jpeg",
        "img/gypsum7.jpeg",
        "img/gypsum8.jpeg"
    ]
  },
  muebles: {
    titulo: "Muebles a Medida",
    icono: "🪑",
    sub: "Muebles personalizados",
    imagenes: [
      "img/mueble1.jpeg",
      "img/mueble2.jpeg",
      "img/mueble3.jpeg",
      "img/mueble4.jpeg",
      "img/mueble5.jpeg",
      "img/mueble6.jpeg",
      "img/mueble7.jpeg",
      "img/mueble8.jpeg",
      "img/mueble9.jpeg",
      "img/mueble10.jpeg",
      "img/mueble11.jpeg",
      "img/mueble12.jpeg",
      "img/mueble13.jpeg"
    ]
  },
 "instalacion-ceramica": {
    titulo: "Instalación de cerámica",
    icono: "🧱",
    sub: "Colocación de cerámica en pisos y paredes",
    imagenes: [
      "img/ceramica1.jpeg",
      "img/ceramica2.jpeg",
      "img/ceramica3.jpeg",
      "img/ceramica4.jpeg",
      "img/portada.jpeg"
      // "img/ceramica5.jpg",
      // "img/ceramica6.jpg",
      // "img/ceramica7.jpg",
      // "img/ceramica1.jpg",
      // "img/ceramica1.jpg",
      // "img/ceramica1.jpg",
      // "img/ceramica1.jpg"
    ]
  },

  pergolas: {
    titulo: "Pérgolas",
    icono: "🌿",
    sub: "Diseño y construcción de pérgolas",
    imagenes: ["img/pergola1.jpeg"]
  }
};

// ABRIR MODAL
function openModal(servicio) {
  const data = serviciosData[servicio];

  modalTitle.textContent = data.titulo;
  modalSub.textContent = data.sub;
  modalIcon.textContent = data.icono;

  modalGallery.innerHTML = "";

  data.imagenes.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    // CLICK = ABRIR IMAGEN GRANDE
    img.onclick = () => {
      imgViewerContent.src = src;
      imgViewer.classList.add("active");
    };

    modalGallery.appendChild(img);
  });

  modalOverlay.classList.add("active");
}

// CERRAR MODAL
function closeModal() {
  modalOverlay.classList.remove("active");
}

// CLICK FUERA
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// BOTÓN X
document.querySelector(".modal-close").addEventListener("click", closeModal);

// ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    imgViewer.classList.remove("active");
  }
});

// CERRAR IMAGEN GRANDE
function closeImageViewer() {
  imgViewer.classList.remove("active");
}

// CLICK EN FONDO IMAGEN
imgViewer.addEventListener("click", closeImageViewer);

let rating = 0;
const stars = document.querySelectorAll("#stars span");
const lista = document.getElementById("listaResenas");

// ⭐ seleccionar estrellas
stars.forEach(star => {
  star.addEventListener("click", () => {
    rating = star.getAttribute("data-value");

    stars.forEach(s => s.classList.remove("active"));

    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("active");
    }
  });
});

// 💾 GUARDAR RESEÑA
function guardarResena() {
  const mensaje = document.getElementById("mensajeCliente").value;

  if (!mensaje || rating == 0) {
    alert("Escribe tu reseña y selecciona estrellas ⭐");
    return;
  }

  const nueva = {
    estrellas: rating,
    texto: mensaje
  };

  let resenas = JSON.parse(localStorage.getItem("resenas")) || [];
  resenas.unshift(nueva);

  localStorage.setItem("resenas", JSON.stringify(resenas));

  document.getElementById("mensajeCliente").value = "";
  stars.forEach(s => s.classList.remove("active"));
  rating = 0;

  mostrarResenas();
}

// 📦 MOSTRAR RESEÑAS
function mostrarResenas() {
  const resenas = JSON.parse(localStorage.getItem("resenas")) || [];

  lista.innerHTML = "";

  resenas.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-card";

    div.innerHTML = `
      <div class="review-stars">${"⭐".repeat(r.estrellas)}</div>
      <div class="review-text">${r.texto}</div>
    `;

    lista.appendChild(div);
  });
}

// cargar al inicio
mostrarResenas();