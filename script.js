// Navbar effect on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.background = 'rgba(13, 12, 12, 0.95)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(13, 12, 12, 0.8)';
        }
    });
}

// Scroll reveal animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// Menu modal logic
const modal = document.getElementById('nutrition-modal');
const closeBtn = document.querySelector('.close-modal');
const menuItems = document.querySelectorAll('.menu-item.clickable');

if (modal && closeBtn && menuItems) {
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Populate modal with item data (mock implementation)
            const title = this.querySelector('.menu-item-title').innerText;
            const calories = this.getAttribute('data-calories') || '250 kcal';
            const macros = this.getAttribute('data-macros') || '10g P / 35g C / 8g F';
            const allergens = this.getAttribute('data-allergens') || 'None';
            
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-calories').innerText = calories;
            document.getElementById('modal-macros').innerText = macros;
            document.getElementById('modal-allergens').innerText = allergens;
            
            modal.style.display = 'flex';
            // Slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400); // Wait for transition
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 400);
        }
    });
}

// Testimonial Carousel
(function () {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('carouselDots');
    if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const CARD_WIDTH = 300 + 24; // card flex-basis + gap
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    let current = 0;

    // Build dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) =>
            d.classList.toggle('active', i === current));
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        track.scrollTo({ left: current * CARD_WIDTH, behavior: 'smooth' });
        updateDots();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Sync dots on manual swipe / drag
    track.addEventListener('scroll', () => {
        current = Math.round(track.scrollLeft / CARD_WIDTH);
        updateDots();
    }, { passive: true });

    // Auto-scroll every 4 seconds
    let timer = setInterval(() => goTo((current + 1) % total), 4000);
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => {
        timer = setInterval(() => goTo((current + 1) % total), 4000);
    });
})();
