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
            navbar.style.background = 'rgba(13, 26, 13, 0.98)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(13, 26, 13, 0.80)';
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


// ── Gallery Swiper (index.html) — simple horizontal slider ────────
if (document.querySelector('.gallery-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.gallery-swiper', {
        speed: 600,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
    });
}

// ── Instagram Swiper (index.html) ────────────────────────────────────────
if (document.querySelector('.ig-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.ig-swiper', {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
        }
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
const preloaderBg = document.querySelector('.preloader-bg');
const preloaderImg = document.querySelector('.preloader-logo-img');

if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloaderBg) {
                preloaderBg.classList.add('fade-out'); // black background fades first
            }
            setTimeout(() => {
                setTimeout(() => {
                    if (preloaderImg) {
                        preloaderImg.classList.add('fade-out'); // sun fades on its own
                    }
                    setTimeout(() => {
                        document.body.classList.add('loaded'); // triggers hero text fadeUp
                        preloader.style.display = 'none';
                    }, 300); // wait for logo fade (0.3s)
                }, 400); // let the sun linger alone with no background
            }, 450); // wait for background fade (0.45s)
        }, 600); // show background + sun together for 0.6s
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
