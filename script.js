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
