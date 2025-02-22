// =====================
// navigation functions 
// =====================

const nav = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const dropdown = item.querySelector('.mega-menu, .drop-menu');

    item.addEventListener('mouseenter', () => {
        // Close all other dropdowns first
        document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
            menu.style.display = 'none';
        });

        // Show the current dropdown
        if (dropdown) {
            dropdown.style.display = 'flex';
        }
    });
});

nav.addEventListener('mouseleave', () => {
    document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});


