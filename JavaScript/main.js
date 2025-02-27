const nav = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-item');
const megaMenus = document.querySelectorAll('.mega-menu, .drop-menu');
const hamburger = document.querySelector('.hamburger'); // make sure to add this in your HTML
const navContainer = document.querySelector('.navContainer');

let currentDropdown = null; // tracks the currently open dropdown
let closingInProgress = false; // flag for a closing animation in progress

// Helper: update navbar background color
function setNavbarColor(color) {
  nav.style.backgroundColor = color;
}

// Cancel any closing animation on the current dropdown if switching to another nav item
function cancelClosing() {
  if (currentDropdown && closingInProgress) {
    currentDropdown.classList.remove('closing', 'instant-text-hide');
    currentDropdown.classList.add('open');
    closingInProgress = false;
  }
}

// Desktop: Handle mouseenter on nav items for dropdown logic
function handleMouseEnter() {
  // Only execute on desktop screens
  if (window.innerWidth <= 768) return;
  
  const dropdown = this.querySelector('.mega-menu, .drop-menu');
  
  // If switching to a new dropdown, cancel closing on the previous one
  if (currentDropdown && currentDropdown !== dropdown) {
    cancelClosing();
    currentDropdown.style.display = 'none';
    currentDropdown.classList.remove('open');
  }
  
  currentDropdown = dropdown;
  
  if (dropdown) {
    const dropdownBg = window.getComputedStyle(dropdown).backgroundColor;
    setNavbarColor(dropdownBg);
    dropdown.style.display = 'flex';
    // Small delay to allow display change to take effect, then animate in
    setTimeout(() => {
      dropdown.classList.add('open');
    }, 10);
  } else {
    setNavbarColor('rgb(34, 34, 34)');
  }
}

// Desktop: Handle mouse leaving the navbar to close dropdowns
function handleNavMouseLeave(event) {
  // Only execute on desktop screens
  if (window.innerWidth <= 768) return;
  
  if (
    event.relatedTarget &&
    (event.relatedTarget.closest('.navbar') || event.relatedTarget.closest('.mega-menu'))
  ) {
    return;
  }
  if (currentDropdown) {
    currentDropdown.classList.add('instant-text-hide');
    currentDropdown.classList.remove('open');
    currentDropdown.classList.add('closing');
    closingInProgress = true;
  }
}

// Add desktop-specific event listeners
function addDesktopEventListeners() {
  navItems.forEach(item => {
    item.addEventListener('mouseenter', handleMouseEnter);
  });
  nav.addEventListener('mouseleave', handleNavMouseLeave);
}

// Remove desktop-specific event listeners (for mobile)
function removeDesktopEventListeners() {
  navItems.forEach(item => {
    item.removeEventListener('mouseenter', handleMouseEnter);
  });
  nav.removeEventListener('mouseleave', handleNavMouseLeave);
}

// Initialize event listeners based on current screen size
if (window.innerWidth > 768) {
  addDesktopEventListeners();
}

// Listen for window resize to add or remove desktop event listeners accordingly
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    addDesktopEventListeners();
  } else {
    removeDesktopEventListeners();
  }
});

// Listen for transition end on dropdowns so that once the slide-up finishes, we hide it and reset navbar color
megaMenus.forEach(menu => {
  menu.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && menu.classList.contains('closing')) {
      menu.classList.remove('closing', 'instant-text-hide');
      menu.style.display = 'none';
      currentDropdown = null;
      setNavbarColor('rgba(34, 34, 34, 0)');
      closingInProgress = false;
    }
  });
});

// Mobile: Hamburger menu toggle for small screens
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navContainer.classList.toggle('active');
  });
}
