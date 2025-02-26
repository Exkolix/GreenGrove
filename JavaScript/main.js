const nav = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-item');

let currentDropdown = null; // tracks the currently open dropdown
let closingInProgress = false; // flag for a closing animation in progress

// Helper: update navbar background color
function setNavbarColor(color) {
  nav.style.backgroundColor = color;
}

// Cancel any closing animation on the current dropdown if switching to another nav item
function cancelClosing() {
  if (currentDropdown && closingInProgress) {
    // Cancel closing by removing closing classes and re-showing the open state
    currentDropdown.classList.remove('closing', 'instant-text-hide');
    currentDropdown.classList.add('open');
    closingInProgress = false;
  }
}

// Listen for transition end on dropdowns so that once the slide-up finishes, we hide it and reset navbar color
document.querySelectorAll('.mega-menu, .drop-menu').forEach(menu => {
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

// When hovering over a nav item, open its dropdown
navItems.forEach(item => {
  const dropdown = item.querySelector('.mega-menu, .drop-menu');

  item.addEventListener('mouseenter', () => {
    // If a closing animation is running on a different dropdown, cancel it
    if (currentDropdown && currentDropdown !== dropdown) {
      cancelClosing();
      // Hide the previous dropdown instantly
      currentDropdown.style.display = 'none';
      currentDropdown.classList.remove('open');
    }
    currentDropdown = dropdown;
    
    if (dropdown) {
      // Change navbar color to match dropdown background
      const dropdownBg = window.getComputedStyle(dropdown).backgroundColor;
      setNavbarColor(dropdownBg);
      dropdown.style.display = 'flex';
      // Small delay for the display change to take effect, then add open class to animate in
      setTimeout(() => {
        dropdown.classList.add('open');
      }, 10);
    } else {
      setNavbarColor('rgb(34, 34, 34)');
    }
  });
});

// When leaving the navbar, start the closing sequence
nav.addEventListener('mouseleave', (event) => {
  // Check if the mouse is still within the navbar or its dropdown
  if (
    event.relatedTarget &&
    (event.relatedTarget.closest('.navbar') || event.relatedTarget.closest('.mega-menu'))
  ) {
    return;
  }
  if (currentDropdown) {
    // Instantly hide text by adding a helper class (see CSS below)
    currentDropdown.classList.add('instant-text-hide');
    // Remove the open state so text is no longer visible
    currentDropdown.classList.remove('open');
    // Add the closing class to start the slide-up animation
    currentDropdown.classList.add('closing');
    closingInProgress = true;
  }
});
