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

// ── Gallery Swiper (reservation.html) ───────────────────────────────────
if (document.querySelector('.gallery-swiper') && typeof Swiper !== 'undefined') {
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
        effect: 'fade',
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.gallery-swiper .swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.gallery-swiper .swiper-button-next',
            prevEl: '.gallery-swiper .swiper-button-prev',
        },
        thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
    });
}

// ── Flatpickr (reservation.html) ────────────────────────────────────────
if (typeof flatpickr !== 'undefined') {
    const dateEl = document.getElementById('visit-date');
    const timeEl = document.getElementById('visit-time');
    if (dateEl) flatpickr(dateEl, {
        minDate: 'today',
        dateFormat: 'D, M j, Y',
        disableMobile: true,
    });
    if (timeEl) flatpickr(timeEl, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'h:i K',
        minTime: '07:00',
        maxTime: '17:00',
        minuteIncrement: 30,
        disableMobile: true,
    });
}

// ── Nutrition Modal (menu.html) ──────────────────────────────────────────
const modal    = document.getElementById('nutrition-modal');
const closeBtn = document.querySelector('.close-modal');
const menuItems = document.querySelectorAll('.menu-item.clickable');

if (modal && closeBtn && menuItems.length) {
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            document.getElementById('modal-title').innerText     = this.querySelector('.menu-item-title').innerText;
            document.getElementById('modal-calories').innerText  = this.getAttribute('data-calories')  || '—';
            document.getElementById('modal-macros').innerText    = this.getAttribute('data-macros')    || '—';
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
