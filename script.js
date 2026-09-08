// ── Lucide Icons ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

// ── AOS Scroll Animations ────────────────────────────────────────────────
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic', offset: 60 });
}

// ── Navbar shrink on scroll ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.background = 'rgba(13, 12, 12, 0.98)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(13, 12, 12, 0.80)';
        }
    }, { passive: true });
}

// ── Mobile menu toggle ───────────────────────────────────────────────────
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        const icon = mobileToggle.querySelector('[data-lucide]');
        if (icon && typeof lucide !== 'undefined') {
            icon.setAttribute('data-lucide', open ? 'x' : 'menu');
            lucide.createIcons();
        }
    });
}

// ── Testimonial Swiper (index.html) ─────────────────────────────────────
// FIX: loop: false + rewind: true prevents Swiper from cloning slides,
// which would cause pagination dot count to mismatch the actual slide count.
// With 10 slides you always get exactly 10 dots.
if (document.querySelector('.testimonial-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: false,
        rewind: true,
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.testimonial-swiper .swiper-pagination',
            clickable: true,
            dynamicBullets: true,   // shows compact sliding dots — readable at 10 slides
        },
        navigation: {
            nextEl: '.testimonial-swiper .swiper-button-next',
            prevEl: '.testimonial-swiper .swiper-button-prev',
        },
    });
}

// ── Gallery Swiper (reservation.html) — cinematic creative effect ────────
if (document.querySelector('.gallery-swiper') && typeof Swiper !== 'undefined') {
    const counterEl = document.getElementById('galleryCurrentSlide');
    const totalSlides = 4; // update if adding more slides

    let thumbsSwiper = null;
    if (document.querySelector('.gallery-thumbs')) {
        thumbsSwiper = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
    }

    new Swiper('.gallery-swiper', {
        effect: 'creative',
        speed: 850,
        loop: true,
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -500],   // active slide sinks back with shadow
                opacity: 0.4,
            },
            next: {
                translate: ['100%', 0, 0], // next slide comes in from right
            },
        },
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
        thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
        on: {
            slideChange: function () {
                if (counterEl) {
                    counterEl.textContent = String(this.realIndex + 1).padStart(2, '0');
                }
            },
        },
    });
}

// Flatpickr removed — Plan Your Visit widget was removed from reservation.html

// ── Nutrition Modal (menu.html) ──────────────────────────────────────────
const modal = document.getElementById('nutrition-modal');
const closeBtn = document.querySelector('.close-modal');
const menuItems = document.querySelectorAll('.menu-item.clickable');

if (modal && closeBtn && menuItems.length) {
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            document.getElementById('modal-title').innerText = this.querySelector('.menu-item-title').innerText;
            document.getElementById('modal-image').src = this.getAttribute('data-image') || '';
            document.getElementById('modal-calories').innerText = this.getAttribute('data-calories') || '—';
            document.getElementById('modal-macros').innerText = this.getAttribute('data-macros') || '—';
            document.getElementById('modal-allergens').innerText = this.getAttribute('data-allergens') || 'None';
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        });
    });
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 400);
    };
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

// ── Lenis Smooth Scrolling ────────────────────────────────────────────────
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// ── Preloader (index.html) ────────────────────────────────────────────────
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                document.body.classList.add('loaded'); // triggers hero text fadeUp
                preloader.style.display = 'none';
            }, 800); // Wait for CSS transition
        }, 1000); // 1 second display
    });
}

// ── Rough Notation (menu.html) ────────────────────────────────────────────
const rnElement = document.getElementById('rn-specialties');
if (rnElement && typeof window.RoughNotation !== 'undefined') {
    const annotation = window.RoughNotation.annotate(rnElement, {
        type: 'circle',
        color: '#d4af37',
        padding: [2, 10],
        strokeWidth: 2,
        animationDuration: 1200
    });

    // Use Intersection Observer to animate only when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => annotation.show(), 300); // slight delay
                observer.unobserve(rnElement);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(rnElement);
}
