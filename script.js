// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
} else {
    body.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    
    if (isDark) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Animated Counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.textContent.includes('%') ? '%' : '+';
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    }
                };
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = body.classList.contains('dark') 
            ? 'rgba(10,10,10,0.98)' 
            : 'rgba(255,255,255,0.98)';
    } else {
        navbar.style.background = body.classList.contains('dark') 
            ? 'rgba(10,10,10,0.95)' 
            : 'rgba(255,255,255,0.95)';
    }
});

// Working Chat Button - Direct Email
function openChat() {
    const subject = encodeURIComponent('Virtual Assistant Inquiry - Portfolio Contact');
    const body = encodeURIComponent(`Hello John Andrei,

I'm interested in discussing virtual assistant services for my business.

Please provide more information about your services and availability.

Best regards,
[Your Name]`);
    
    window.open(`mailto:amphibians46@gmail.com?subject=${subject}&body=${body}`, '_blank');
}

// Certificate scroll functionality with enhanced controls
const certificatesScroll = document.querySelector('.certificates-scroll');
if (certificatesScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    certificatesScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - certificatesScroll.offsetLeft;
        scrollLeft = certificatesScroll.scrollLeft;
        certificatesScroll.style.cursor = 'grabbing';
    });

    certificatesScroll.addEventListener('mouseleave', () => {
        isDown = false;
        certificatesScroll.style.cursor = 'grab';
    });

    certificatesScroll.addEventListener('mouseup', () => {
        isDown = false;
        certificatesScroll.style.cursor = 'grab';
    });

    certificatesScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - certificatesScroll.offsetLeft;
        const walk = (x - startX) * 2;
        certificatesScroll.scrollLeft = scrollLeft - walk;
    });

    // Add keyboard navigation
    certificatesScroll.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            certificatesScroll.scrollBy({ left: -350, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            certificatesScroll.scrollBy({ left: 350, behavior: 'smooth' });
        }
    });
}

// Enhanced hover effects for cards
document.querySelectorAll('.skill-category, .certificate-card, .timeline-content').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 1500);
});

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add hover effect to scroll-to-top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Enhanced mobile responsiveness
function handleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    hamburger.style.cssText = `
        display: none;
        flex-direction: column;
        cursor: pointer;
        gap: 4px;
    `;
    
    hamburger.querySelectorAll('span').forEach(span => {
        span.style.cssText = `
            width: 25px;
            height: 3px;
            background: #3b82f6;
            transition: 0.3s;
        `;
    });

    if (window.innerWidth <= 768) {
        document.querySelector('.nav-container').appendChild(hamburger);
        hamburger.style.display = 'flex';
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10,10,10,0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        body:not(.dark) .nav-menu {
            background: rgba(255,255,255,0.95);
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

document.head.appendChild(mobileMenuStyles);

// Image Modal/Lightbox for Social Media Management
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
        modalCaption.textContent = this.alt;
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    modalImg.src = '';
    modalCaption.textContent = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        modalImg.src = '';
        modalCaption.textContent = '';
    }
}); 