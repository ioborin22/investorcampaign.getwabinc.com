
// scrollToTop
const scrollToTopButton = document.getElementById('scrollToTop');

function hideScrollToTop() {
  scrollToTopButton.style.display = 'none';
}

function showScrollToTop() {
  if (window.scrollY > 800) {
    scrollToTopButton.style.display = 'block';
  }
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 800 && !document.body.classList.contains('no-scroll')) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Function to close all modals before opening a new one
function closeAllModals() {
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach((modal) => {
    modal.style.display = 'none';
  });
  document.body.classList.remove('no-scroll');
}

// Modal
const modal = document.getElementById('modal');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

function openModal() {
  closeAllModals();
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll');
  hideScrollToTop();
}

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll');
  showScrollToTop();
}

const openModalButton = document.getElementById('openModal');
if (openModalButton) {
  openModalButton.addEventListener('click', openModal);
}

const openModalClubButton = document.getElementById('openModalClub');
if (openModalClubButton) {
  openModalClubButton.addEventListener('click', openModal);
}

const openModalClub2Button = document.getElementById('openModalClub2');
if (openModalClub2Button) {
  openModalClub2Button.addEventListener('click', openModal);
}

const openModalClub3Button = document.getElementById('openModalClub3');
if (openModalClub3Button) {
  openModalClub3Button.addEventListener('click', openModal);
}

const openModalClub4Button = document.getElementById('openModalClub4');
if (openModalClub4Button) {
  openModalClub4Button.addEventListener('click', openModal);
}

const openModalClub5Button = document.getElementById('openModalClub5');
if (openModalClub5Button) {
  openModalClub5Button.addEventListener('click', openModal);
}

const openModalClub6Button = document.getElementById('openModalClub6');
if (openModalClub6Button) {
  openModalClub6Button.addEventListener('click', openModal);
}

const openModalClub7Button = document.getElementById('openModalClub7');
if (openModalClub7Button) {
  openModalClub7Button.addEventListener('click', openModal);
}

document.getElementById('closeModal').addEventListener('click', function () {
  closeModal();
});

tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    tabs.forEach((t) => t.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    this.classList.add('active');
    document.getElementById(this.dataset.tab).classList.add('active');
  });
});

// burgerMenu
const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const body = document.body;

burgerMenu.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  body.classList.add('no-scroll');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  body.classList.remove('no-scroll');
});

const menuLinks = document.querySelectorAll('#mobileMenu a');
menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    body.classList.remove('no-scroll');
  });
});

// video
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.number');

  const animateNumber = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const unit = counter.getAttribute('data-unit') || '';
    const currency = counter.getAttribute('data-currency') === 'true';
    const speedType = counter.getAttribute('data-speed');
    const speed = speedType === 'slow' ? 100 : 50;
    const increment = target / speed;

    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = `>${currency ? '$' : ''}${count.toFixed(
          unit ? 1 : 0,
        )} ${unit}`;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = `>${currency ? '$' : ''}${target.toFixed(
          unit ? 1 : 0,
        )} ${unit}`;
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  counters.forEach((counter) => observer.observe(counter));
});

// FAQ
document.querySelectorAll('.faq-category-title').forEach((categoryTitle) => {
  categoryTitle.addEventListener('click', () => {
    const items = categoryTitle.nextElementSibling;
    const toggle = categoryTitle.querySelector('.faq-toggle');

    if (items.style.display === 'block') {
      items.style.display = 'none';
      toggle.textContent = '+';
    } else {
      items.style.display = 'block';
      toggle.textContent = '−';
    }
  });
});

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const toggle = question.querySelector('.faq-toggle');

    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      toggle.textContent = '+';
    } else {
      answer.style.display = 'block';
      toggle.textContent = '−';
    }
  });
});

// Purchase modals
const professionalPlanModal = document.getElementById('professionalPlanModal');
const powerPlanModal = document.getElementById('powerPlanModal');
const closeProfessionalModalButton = professionalPlanModal.querySelector('.purchase-close-modal');
const closePowerModalButton = powerPlanModal.querySelector('.purchase-close-modal');

// Professional Plan Buttons
document
  .getElementById('professionalPlanButtonModal')
  ?.addEventListener('click', () => openModalPurchase(professionalPlanModal));

document
  .getElementById('professionalPlanButton')
  ?.addEventListener('click', () => openModalPurchase(professionalPlanModal));

// Power Plan Buttons
document
  .getElementById('powerPlanButtonModal')
  ?.addEventListener('click', () => openModalPurchase(powerPlanModal));

document
  .getElementById('powerPlanButton')
  ?.addEventListener('click', () => openModalPurchase(powerPlanModal));

// Functions to open and close modals
function openModalPurchase(modal) {
  closeAllModals(); // Close all modals before opening the new one
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll');
}

function closeModalPurchase(modal) {
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll');
}

// Close modals via close buttons
closeProfessionalModalButton.addEventListener('click', () =>
  closeModalPurchase(professionalPlanModal),
);
closePowerModalButton.addEventListener('click', () =>
  closeModalPurchase(powerPlanModal),
);

// Formatting functions for card inputs
function formatCardNumber(input) {
  const value = input.value.replace(/\D/g, '');
  const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
  input.value = formatted;
}

function updateCardHolder(input) {
  input.value = input.value.toUpperCase();
}

function formatExpiryDate(input) {
  const value = input.value.replace(/[^0-9]/g, '');
  const formatted =
    value.length > 2 ? value.substring(0, 2) + '/' + value.substring(2) : value;
  input.value = formatted.substring(0, 5);
}
// END Purchase modals


// Modal Logic for "Schedule a Demo"
const demoModal = document.getElementById('demoModal');
const closeDemoModalButton = document.getElementById('closeDemoModal');
const demoForm = document.getElementById('demoForm');
const desktopDemoButton = document.getElementById('descDemoStart');
const mobileDemoButton = document.getElementById('mobileDemoStart');

function openDemoModal() {
  demoModal.style.display = 'flex';
  body.style.overflow = 'hidden';
}

function closeDemoModal() {
  demoModal.style.display = 'none';
  body.style.overflow = 'auto';
}

closeDemoModalButton.addEventListener('click', closeDemoModal);

window.addEventListener('click', (event) => {
  if (event.target === demoModal) {
    closeDemoModal();
  }
});

desktopDemoButton.addEventListener('click', openDemoModal);

mobileDemoButton.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    body.classList.remove('no-scroll');
  }
  openDemoModal();
});

demoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Form submitted successfully!');
  closeDemoModal();
});

// Modal Watch Demo
const watchDemoModal = document.getElementById('watchDemoModal');
const closeWatchDemoModalButton = document.getElementById(
  'closeWatchDemoModal',
);
const watchDemoButton = document.querySelector('.button-blue');
const joinClubButton = document.getElementById('openModalClub');

function openWatchDemoModal() {
  watchDemoModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// closeWatchDemoModal
joinClubButton.addEventListener('click', () => {
  closeWatchDemoModal();
  openModal(); 
});

function closeWatchDemoModal() {
  watchDemoModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

watchDemoButton.addEventListener('click', openWatchDemoModal);
closeWatchDemoModalButton.addEventListener('click', closeWatchDemoModal);

window.addEventListener('click', (event) => {
  if (event.target === watchDemoModal) {
    closeWatchDemoModal();
  }
});
// END Modal Watch Demo

// Modal subscribe
document.getElementById('subscribe').addEventListener('click', function () {
  const modal = document.getElementById('subscriptionModal');
  modal.style.display = 'flex';
});

document
  .getElementById('closeSubscriptionModal')
  .addEventListener('click', function () {
    const modal = document.getElementById('subscriptionModal');
    modal.style.display = 'none';
  });

window.addEventListener('click', function (event) {
  const modal = document.getElementById('subscriptionModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document
  .getElementById('professionalPurchaseButton')
  .addEventListener('click', function () {
    alert('Success');
  });

document
  .getElementById('powerPurchaseButton')
  .addEventListener('click', function () {
    alert('Success');
  });
// END Modal subscribe
