// =====================
// navigation functions 
// =====================

const nav = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-item');

// Attach transitionend listener to each dropdown to hide it after the close transition
document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
    menu.addEventListener('transitionend', () => {
        if (!menu.classList.contains('open')) {
            menu.style.display = 'none';
        }
    });
});

navItems.forEach(item => {
    const dropdown = item.querySelector('.mega-menu, .drop-menu');

    item.addEventListener('mouseenter', () => {
        // Close all other dropdowns first
        document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
            menu.classList.remove('open');
            // Removed setTimeout; display will be set to 'none' via transitionend event
        });

        // Show the current dropdown and trigger its animation
        if (dropdown) {
            dropdown.style.display = 'flex';
            // Allow a short delay for the display change to take effect
            setTimeout(() => {
                dropdown.classList.add('open');
            }, 10);
        }
    });
});

nav.addEventListener('mouseleave', () => {
    // When leaving the navbar, close all dropdowns with animation
    document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
        menu.classList.remove('open');
        // Again, display will be set to 'none' once the transition ends
    });
});
