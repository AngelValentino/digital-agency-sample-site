const navMenuBtn = document.getElementById('navbar__menu-btn');
const mobileMenuLm = document.getElementById('mobile-menu');
const openModalBtn = document.getElementById('hero_contact-btn');

import { openMobileMenu, closeMobileMenuAfterLinkClick } from "./menu.js";
import { openModal } from "./modal.js";

// MOBILE MENU
// Open mobile menu when the menu button is clicked and add accessibility support, such as close at 'Escape' key
navMenuBtn.addEventListener('click', openMobileMenu);
// Close the mobile menu after a navigation link is clicked
mobileMenuLm.addEventListener('click', closeMobileMenuAfterLinkClick);

// CONTACT MODAL
openModalBtn.addEventListener('click', openModal);