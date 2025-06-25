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
    
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 10000);
    }
}

// Crear partículas periódicamente
setInterval(createParticle, 300);

// Manejo del formulario de consulta rápida
document.addEventListener('DOMContentLoaded', function() {
    const quickForm = document.getElementById('quickContactForm');
    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, select');
            const nombre = inputs[0].value.trim();
            const telefono = inputs[1].value.trim();
            const servicio = inputs[2].value;
            
            // Validación básica
            if (!nombre || !telefono || !servicio) {
                showNotification('Por favor, complete todos los campos.', 'error');
                return;
            }
            
            // Validación de teléfono
            if (!validatePhoneFormat(telefono)) {
                showNotification('Por favor, ingrese un teléfono válido.', 'error');
                return;
            }
            
            // Crear mensaje para WhatsApp
            const message = `Hola! Soy ${nombre}. Me interesa el servicio de ${getServiceName(servicio)}. Mi teléfono es ${telefono}. ¿Pueden contactarme para más información?`;
            const whatsappUrl = `https://wa.me/5491138242042?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Mostrar mensaje de éxito
            showNotification('¡Solicitud enviada! Te redirigimos a WhatsApp.', 'success');
            
            // Resetear formulario
            this.reset();
        });
    }
});

// Obtener nombre del servicio
function getServiceName(value) {
    const services = {
        'custodia-vip': 'Custodia VIP',
        'seguimiento-mercaderia': 'Seguimiento de Mercadería',
        'eventos': 'Eventos Públicos y Privados',
        'barrios-cerrados': 'Barrios Cerrados',
        'seguridad-empresarial': 'Seguridad Empresarial',
        'tecnologia': 'Tecnología de Seguridad'
    };
    return services[value] || 'Consulta General';
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff88, #00cc66)' : 
                     type === 'error' ? 'linear-gradient(45deg, #ff4444, #cc0000)' : 
                     'linear-gradient(45deg, #00d4ff, #0099cc)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Animación de estado online/offline para asesores
function updateAdvisorStatus() {
    const statusDots = document.querySelectorAll('.status-dot');
    const currentHour = new Date().getHours();
    
    statusDots.forEach((dot, index) => {
        // Simular horarios de atención (esto se puede conectar con una API real)
        const isOnline = (index === 0) ? 
            (currentHour >= 8 && currentHour <= 20) : // Carlos: 8-20
            (currentHour >= 9 && currentHour <= 18);  // María: 9-18
            
        if (isOnline) {
            dot.classList.add('online');
            dot.parentElement.innerHTML = dot.parentElement.innerHTML.replace('En línea', 'En línea');
        } else {
            dot.classList.remove('online');
            dot.style.background = '#666';
            dot.parentElement.innerHTML = dot.parentElement.innerHTML.replace('En línea', 'Fuera de línea');
        }
    });
}

// Actualizar estado cada minuto
setInterval(updateAdvisorStatus, 60000);

// Efecto de hover en botones de WhatsApp
function setupWhatsAppEffects() {
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto de click
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
    });
}

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.dataset.suffix || '');
        }
    }
    
    updateCounter();
}

// Activar contadores cuando sean visibles
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            const target = parseInt(text.replace(/\D/g, ''));
            
            if (target) {
                number.dataset.suffix = text.replace(/\d/g, '');
                animateCounter(number, target);
            }
        }
    });
}, { threshold: 0.5 });

// Observar las estadísticas
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto de escritura al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 500);
    }
});

// Menú responsive (para futuras mejoras)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento según el dispositivo
window.addEventListener('resize', function() {
    if (!isMobile()) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

// Función para validar formulario en tiempo real
function setupFormValidation() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Validación al perder el foco
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Validación en tiempo real para ciertos campos
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                validateEmail(this);
            });
        }
        
        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                validatePhone(this);
            });
        }
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Eliminar mensajes de error previos
    removeErrorMessage(field);
    
    // Validaciones específicas por tipo de campo
    switch(field.type) {
        case 'text':
            if (field.required && !value) {
                isValid = false;
                message = 'Este campo es obligatorio';
            } else if (value && value.length < 2) {
                isValid = false;
                message = 'Debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            if (field.required && !value) {
                isValid = false;
                message = 'El email es obligatorio';
            } else if (value && !validateEmailFormat(value)) {
                isValid = false;
                message = 'Formato de email inválido';
            }
            break;
            
        case 'tel':
            if (value && !validatePhoneFormat(value)) {
                isValid = false;
                message = 'Formato de teléfono inválido';
            }
            break;
            
        default:
            if (field.tagName === 'TEXTAREA' && field.required && !value) {
                isValid = false;
                message = 'Este campo es obligatorio';
            }
    }
    
    // Mostrar error si no es válido
    if (!isValid) {
        showErrorMessage(field, message);
        field.classList.add('error');
    } else {
        field.classList.remove('error');
        field.classList.add('valid');
    }
    
    return isValid;
}

// Validar formato de email
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar email en tiempo real
function validateEmail(field) {
    const value = field.value.trim();
    removeErrorMessage(field);
    
    if (value && !validateEmailFormat(value)) {
        showErrorMessage(field, 'Formato de email inválido');
        field.classList.add('error');
    } else {
        field.classList.remove('error');
        if (value) field.classList.add('valid');
    }
}

// Validar formato de teléfono
function validatePhoneFormat(phone) {
    // Acepta formatos: +54 11 1234-5678, 11-1234-5678, 1112345678, etc.
    const phoneRegex = /^(\+?54\s?)?(\d{2,4}[\s\-]?\d{4}[\s\-]?\d{4}|\d{8,12})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Validar teléfono en tiempo real
function validatePhone(field) {
    const value = field.value.trim();
    removeErrorMessage(field);
    
    if (value && !validatePhoneFormat(value)) {
        showErrorMessage(field, 'Formato de teléfono inválido');
        field.classList.add('error');
    } else {
        field.classList.remove('error');
        if (value) field.classList.add('valid');
    }
}

// Mostrar mensaje de error
function showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Eliminar mensaje de error
function removeErrorMessage(field) {
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Efecto de paralaje suave
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Efecto de hover en las tarjetas de servicio
function setupCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Funcionalidad de botón "scroll to top"
function setupScrollToTop() {
    // Crear botón
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Funcionalidad del botón
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efecto hover
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.5)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
    });
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupParallax();
    setupCardEffects();
    setupScrollToTop();
    setupWhatsAppEffects();
    updateAdvisorStatus();
    
    // Agregar estilos CSS adicionales para validación y notificaciones
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error,
        .quick-form input.error,
        .quick-form select.error {
            border-color: #ff4444;
            box-shadow: 0 0 5px rgba(255, 68, 68, 0.3);
        }
        
        .form-group input.valid,
        .form-group textarea.valid,
        .form-group select.valid,
        .quick-form input.valid,
        .quick-form select.valid {
            border-color: #00d4ff;
            box-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
        }
        
        .scroll-to-top:hover {
            transform: scale(1.1) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        .notification-message {
            font-size: 0.9rem;
        }
        
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

// Eventos para detectar actividad
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

// Inicializar timer de inactividad
resetInactivityTimer();