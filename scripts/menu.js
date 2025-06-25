import { 
  toggleModalFocus, 
  toggleModalEvents, 
  setScrollBehavior 
} from "./utils.js";


//* DOM REFERENCES
const navMenuBtn = document.getElementById('navbar__menu-btn');
const mobileMenuLm = document.getElementById('mobile-menu');
const closeMobileMenuBtn = document.getElementById('mobile-menu__close-btn');

//* VARIABLES
// Object to store event handlers for the mobile menu
const mobileMenuEventsHandler = {};

//* REASSIGNMENT VARIABLES
let hideMobileMenuTimId = null;
let hideMobileMenuOverflowTimId = null;
let lastActiveLmBeforeMobileMenu = null;

function closeMobileMenu() {
  // Clear any existing timeouts
  clearTimeout(hideMobileMenuOverflowTimId);
  // Set overflow back to normal
  document.body.style.overflow = "";

  // Transition element visiblity to none
  mobileMenuLm.classList.remove('show');
  navMenuBtn.ariaExpanded = false;

  // Hide mobile menu
  hideMobileMenuTimId = setTimeout(() => {
    mobileMenuLm.style.display = 'none';
    // Only return focus if the user has not clicked any link
    if (document.activeElement !== document.body) {
      toggleModalFocus('return', null, lastActiveLmBeforeMobileMenu);
    }
    // Set scroll behaviour back to normal
    setScrollBehavior();
  }, 300);

  // Remove event listeners
  toggleModalEvents(mobileMenuEventsHandler, 'remove', null, closeMobileMenuBtn, mobileMenuLm);
}

export function openMobileMenu() {
  // Clear any existing timeout
  clearTimeout(hideMobileMenuTimId);
  // Show menu
  mobileMenuLm.style.display = 'flex';
  navMenuBtn.ariaExpanded = true;
  // Transition menu
  setTimeout(() => {
    mobileMenuLm.classList.add('show');
    // Add focus to close button
    lastActiveLmBeforeMobileMenu = toggleModalFocus('add', closeMobileMenuBtn);
  }, 20);

  // Set a timeout to hide the body overflow
  hideMobileMenuOverflowTimId = setTimeout(() => {
    document.body.style.overflow = "hidden";
  }, 300);

  // Add event listeners
  toggleModalEvents(mobileMenuEventsHandler, 'add', closeMobileMenu, closeMobileMenuBtn, mobileMenuLm);
}

export function closeMobileMenuAfterLinkClick(e) {
  // Close menu if target is a mobile menu link
  if (e.target.classList.contains('mobile-menu__link')) {
    // Add instat scroll behaviour
    document.documentElement.style.scrollBehavior = 'auto';
    closeMobileMenu();
  }
}