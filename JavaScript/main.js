// ============
//  Navigation 
// ============
const nav = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-item');
const megaMenus = document.querySelectorAll('.mega-menu, .drop-menu');
const hamburger = document.querySelector('.hamburger'); // ensure it's in your HTML
const navContainer = document.querySelector('.navContainer');
const overlay = document.querySelector('#overlay');

let currentDropdown = null;       // Currently open dropdown 
let closingInProgress = false;    // Indicates if a dropdown is currently closing
let isDropdownOpen = false;       // Tracks whether any dropdown is open

// Helper: update navbar background color
function setNavbarColor(color) {
  nav.style.backgroundColor = color;
}

// Cancel any ongoing closing animation when switching dropdowns
function cancelClosing() {
  if (currentDropdown && closingInProgress) {
    currentDropdown.classList.remove('closing', 'instant-text-hide');
    currentDropdown.classList.add('open');
    closingInProgress = false;
  }
}

// Handle mouseenter on nav items for dropdown logic (desktop only)
function handleMouseEnter() {
  if (window.innerWidth <= 890) return;
  
  const dropdown = this.querySelector('.mega-menu, .drop-menu');
  
  // If switching to a new dropdown, cancel the closing animation on the previous one
  if (currentDropdown && currentDropdown !== dropdown) {
    cancelClosing();
    currentDropdown.style.display = 'none';
    currentDropdown.classList.remove('open');
  }
  
  currentDropdown = dropdown;
  isDropdownOpen = !!dropdown;
  
  if (dropdown) {
    const dropdownBg = window.getComputedStyle(dropdown).backgroundColor;
    setNavbarColor(dropdownBg);
    dropdown.style.display = 'flex';
    // Add a slight delay so the display change takes effect before animating
    setTimeout(() => dropdown.classList.add('open'), 10);
  } else {
    setNavbarColor('rgb(34, 34, 34)');
  }
}

// Handle mouse leave from navbar (desktop only)
function handleNavMouseLeave(event) {
  if (window.innerWidth <= 890) return;
  
  // Check if the mouse is still over the navbar or a dropdown
  if (
    event.relatedTarget &&
    (event.relatedTarget.closest('.navbar') || event.relatedTarget.closest('.mega-menu'))
  ) {
    return;
  }
  
  if (currentDropdown) {
    currentDropdown.classList.add('instant-text-hide', 'closing');
    currentDropdown.classList.remove('open');
    isDropdownOpen = false;
    closingInProgress = true;
  }
}

// Close any open dropdown immediately
function closeAllDropdowns() {
  if (currentDropdown) {
    currentDropdown.classList.remove('open', 'closing', 'instant-text-hide');
    currentDropdown.style.display = 'none';
    currentDropdown = null;
    isDropdownOpen = false;
    setNavbarColor('rgba(34, 34, 34, 0)');
  }
}

// Add desktop-specific event listeners
function addDesktopEventListeners() {
  navItems.forEach(item => {
    item.addEventListener('mouseenter', handleMouseEnter);
    // Also close dropdown on link click
    item.addEventListener('click', closeAllDropdowns);
  });
  nav.addEventListener('mouseleave', handleNavMouseLeave);
}

// Remove desktop-specific event listeners (for mobile)
function removeDesktopEventListeners() {
  navItems.forEach(item => {
    item.removeEventListener('mouseenter', handleMouseEnter);
    item.removeEventListener('click', closeAllDropdowns);
  });
  nav.removeEventListener('mouseleave', handleNavMouseLeave);
}

// Initialize event listeners based on screen size
if (window.innerWidth > 890) {
  addDesktopEventListeners();
}

// Listen for window resize to toggle event listeners and close dropdowns on mobile switch
window.addEventListener('resize', () => {
  if (window.innerWidth > 890) {
    addDesktopEventListeners();
  } else {
    removeDesktopEventListeners();
    closeAllDropdowns();
  }
});

// Listen for transition end on dropdowns to finalize closing animations
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

// Mobile: Hamburger menu toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    if (navContainer.classList.contains('active')) {
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    } else {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  });
}

// Close sidebar on mobile
function closeSidebar() {
  navContainer.classList.remove('active');
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}

// Close mobile menu when clicking on overlay
if (overlay) {
  overlay.addEventListener('click', closeSidebar);
}

// For mobile: Toggle submenu dropdowns
document.querySelectorAll('.mega-parent > a').forEach(item => {
  item.addEventListener('click', function(e) {
    if (window.innerWidth <= 890) {
      e.preventDefault();
      const megaMenu = this.nextElementSibling;
      megaMenu.classList.toggle('open');
    }
  });
});

// Progressive navbar: Adjust navbar color, blur, and padding based on scroll
document.addEventListener('scroll', () => {
  // Only apply scroll effect if no dropdown is open
  if (isDropdownOpen) return;
  
  const scrollY = window.scrollY;
  const maxScroll = window.innerHeight;
  const opacity = Math.min(scrollY / maxScroll, 0.4);
  const blur = Math.min((scrollY / maxScroll) * 10, 10);
  
  nav.style.backgroundColor = `rgba(34, 34, 34, ${opacity})`;
  nav.style.backdropFilter = `blur(${blur}px)`;
  
  if (window.innerWidth > 890) {
    const paddingVertical = 20 - (10 * (scrollY / maxScroll));
    const paddingHorizontal = 60 - (30 * (scrollY / maxScroll));
    nav.style.padding = `${paddingVertical}px ${paddingHorizontal}px`;
  }
});

// ===============
//  Hero Section
// ===============
document.addEventListener('DOMContentLoaded', () => {
  const animatedTexts = document.querySelectorAll('.animated-text');
  let currentIndex = 0;
  
  function animateText() {
    // Remove active and fade-out classes from all texts
    animatedTexts.forEach(text => text.classList.remove('active', 'fade-out'));
    
    // Activate the current text
    animatedTexts[currentIndex].classList.add('active');
    
    // Fade out after a delay
    setTimeout(() => {
      animatedTexts[currentIndex].classList.add('fade-out');
    }, 2500);
    
    // Cycle to the next text
    currentIndex = (currentIndex + 1) % animatedTexts.length;
    setTimeout(animateText, 3000);
  }
  
  animateText();
});
document.addEventListener('DOMContentLoaded', function() {
  // === Visitor Count ===
  let count = localStorage.getItem('visitorCount');
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count) + 1;
  }
  localStorage.setItem('visitorCount', count);
  
  const visitorCountEl = document.getElementById('visitor-count');
  if (visitorCountEl) {
    visitorCountEl.innerText = 'Visitor Count: ' + count;
  }
  
  // === Scrolling Ticker ===
  function updateTicker() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();
    
    let tickerText = `${dateString} ${timeString}`;
    
    // Use geolocation (if permitted) to get location data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const lat = position.coords.latitude.toFixed(2);
          const lon = position.coords.longitude.toFixed(2);
          tickerText += ` | Location: ${lat}, ${lon}`;
          document.getElementById('ticker-content').innerText = tickerText;
      }, function(error) {
          // If error occurs, simply display date and time
          document.getElementById('ticker-content').innerText = tickerText;
      });
    } else {
      document.getElementById('ticker-content').innerText = tickerText;
    }
  }
  
  updateTicker();
  setInterval(updateTicker, 1000);
});

