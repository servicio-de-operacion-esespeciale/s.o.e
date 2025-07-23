// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cambio de fondo del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 20, 25, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 20, 25, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Función para crear partículas flotantes
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    document.getElementById('particles').appendChild(particle);

    // Eliminar la partícula después de su animación para evitar acumulación
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// Generar partículas continuamente
setInterval(createParticle, 500); // Crea una nueva partícula cada 0.5 segundos

// Añadir un estilo para el botón de WhatsApp al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .whatsapp-btn {
            position: relative;
            overflow: hidden;
        }
        
        .whatsapp-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .whatsapp-btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
});

// Funciones adicionales para mejorar la experiencia
function preloadImages() {
    // Precargar imágenes importantes para mejorar el rendimiento
    const images = [
        // Agregar URLs de imágenes si las tienes
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Detectar si el usuario está inactivo
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Reducir animaciones para ahorrar batería
        document.body.classList.add('reduced-motion');
    }, 300000); // 5 minutos
}

// Eventos para detectar actividad del usuario
['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, resetInactivityTimer, false);
});

// Iniciar el temporizador de inactividad al cargar la página
resetInactivityTimer();

// Lógica del banner de consentimiento de cookies y modal de política de privacidad
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieConsentBanner');
    const acceptButton = document.getElementById('acceptCookies');
    const showPrivacyPolicyLink = document.getElementById('showPrivacyPolicy');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const closeButton = privacyPolicyModal.querySelector('.close-button');
    const cookieAccepted = localStorage.getItem('cookieAccepted');

    if (!cookieAccepted) {
        // Muestra el banner si las cookies no han sido aceptadas
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000); // Pequeño retraso para que la animación sea visible
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.classList.remove('show');
        // Opcional: Remover el banner del DOM después de ocultarlo
        setTimeout(() => {
            cookieBanner.remove();
        }, 300); // Coincide con la duración de la transición CSS
    });

    // Mostrar el modal de la política de privacidad
    showPrivacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el enlace salte a otra parte de la página
        privacyPolicyModal.classList.add('show');
    });

    // Ocultar el modal cuando se hace clic en el botón de cerrar
    closeButton.addEventListener('click', () => {
        privacyPolicyModal.classList.remove('show');
    });

    // Ocultar el modal cuando se hace clic fuera del contenido del modal
    window.addEventListener('click', (event) => {
        if (event.target == privacyPolicyModal) {
            privacyPolicyModal.classList.remove('show');
        }
    });
});
