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
