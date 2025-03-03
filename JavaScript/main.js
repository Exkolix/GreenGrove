// ============
//  Navigation 
// ============
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
  if (window.innerWidth <= 890) return;
  
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
  if (window.innerWidth <= 890) return;
  
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
if (window.innerWidth > 890) {
  addDesktopEventListeners();
}

// Listen for window resize to add or remove desktop event listeners accordingly
window.addEventListener('resize', () => {
  if (window.innerWidth > 890) {
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
    if (navContainer.classList.contains('active')) {
      overlay.style.display = 'block';
      // Add a small delay before setting opacity to 1 to allow the display change to take effect
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    } else {
      overlay.style.opacity = '0';
      // Wait for the opacity transition to complete before hiding the overlay
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300); // Match this with your CSS transition time
    }
  });
}
// close sidebar
function closeSidebar() {
  navContainer.classList.remove('active');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}
// Close menu when clicking on overlay
if (overlay) {
  overlay.addEventListener('click', closeSidebar);
}
// For mobile: Toggle submenu dropdowns
document.querySelectorAll('.mega-parent > a').forEach(item => {
  item.addEventListener('click', function(e) {
    // Only handle submenu toggle on mobile
    if (window.innerWidth <= 890) {
      e.preventDefault();
      const megaMenu = this.nextElementSibling;
      megaMenu.classList.toggle('open');
    }
  });
});
function closeAllDropdowns() {
  if (currentDropdown) {
    currentDropdown.classList.remove('open', 'closing', 'instant-text-hide');
    currentDropdown.style.display = 'none';
    currentDropdown = null;
    setNavbarColor('rgba(34, 34, 34, 0)');
  }
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 890) {
    addDesktopEventListeners();
  } else {
    removeDesktopEventListeners();
    closeAllDropdowns(); // Close any open dropdown on mobile switch
  }
});
const mobileNavItems = document.querySelectorAll('.nav-item');



// Progressive navbar 
document.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight; // 100vh

  // Calculate the opacity and blur based on scroll position
  const opacity = Math.min(scrollY / maxScroll, 0.4);
  const blur = Math.min((scrollY / maxScroll) * 10, 10);

  // Apply the styles to the navbar
  navbar.style.backgroundColor = `rgba(34, 34, 34, ${opacity})`;
  navbar.style.backdropFilter = `blur(${blur}px)`;

  // Adjust padding for desktop screens
  if (window.innerWidth > 890) {
      const paddingVertical = 20 - (10 * (scrollY / maxScroll));
      const paddingHorizontal = 60 - (30 * (scrollY / maxScroll));
      navbar.style.padding = `${paddingVertical}px ${paddingHorizontal}px`;
  }
});
// ===============
//  Hero Section
// ===============
document.addEventListener('DOMContentLoaded', () => {
  const animatedTexts = document.querySelectorAll('.animated-text');
  let currentIndex = 0;

  function animateText() {
      // Remove active class from all texts
      animatedTexts.forEach(text => text.classList.remove('active', 'fade-out'));

      // Add active class to current text
      animatedTexts[currentIndex].classList.add('active');

      // Set timeout for fading out
      setTimeout(() => {
          animatedTexts[currentIndex].classList.add('fade-out');
      }, 2500);

      // Move to next text
      currentIndex = (currentIndex + 1) % animatedTexts.length;

      // Set timeout for next animation
      setTimeout(animateText, 3000);
  }

  animateText();
});
