const form = document.querySelector('#reservation-form');
const success = document.querySelector('#success-message');
const count = document.querySelector('#places-count');
const progress = document.querySelector('#places-progress');
const purchaseStep = document.querySelector('#purchase-step');
const shippingStep = document.querySelector('#shipping-step');
const continueButton = document.querySelector('#continue-to-shipping');
const backButton = document.querySelector('#back-to-purchase');
const stepMarkers = document.querySelectorAll('[data-step-marker]');

// Aquest comptador és una demostració local. Connecta'l a la base de dades
// o plataforma de pagament per sincronitzar les places entre tots els visitants.
const TOTAL_PLACES = 50;
const STORAGE_KEY = 'correspondencia-places-v1';
let available = Number(localStorage.getItem(STORAGE_KEY) || TOTAL_PLACES);

function updateCounter() {
  count.textContent = available;
  progress.style.width = `${(available / TOTAL_PLACES) * 100}%`;
}

updateCounter();

function showStep(step) {
  purchaseStep.hidden = step !== 1;
  shippingStep.hidden = step !== 2;
  stepMarkers.forEach((marker) => {
    marker.classList.toggle('active', Number(marker.dataset.stepMarker) === step);
  });
}

continueButton.addEventListener('click', () => {
  const firstStepFields = [form.elements.name, form.elements.email];
  const invalidField = firstStepFields.find((field) => !field.checkValidity());

  if (invalidField) {
    invalidField.reportValidity();
    return;
  }

  showStep(2);
  shippingStep.querySelector('input').focus();
});

backButton.addEventListener('click', () => {
  showStep(1);
  form.elements.name.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  if (available > 0) {
    available -= 1;
    localStorage.setItem(STORAGE_KEY, String(available));
    updateCounter();
  }

  form.hidden = true;
  stepMarkers.forEach((marker) => marker.classList.toggle('active', marker.dataset.stepMarker === '3'));
  success.hidden = false;
  success.focus();
});

document.querySelectorAll('[data-dialog]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialog = document.querySelector(`#${trigger.dataset.dialog}`);
    dialog?.showModal();
  });
});

document.querySelectorAll('.legal-dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
