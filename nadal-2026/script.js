// Animacions d'entrada suaus. El contingut continua visible sense JavaScript.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-enabled");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("is-pending");
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-pending");
    revealObserver.observe(element);
  });
}

const giftGuideDialog = document.querySelector("#gift-guide-dialog");
const openGiftGuideButton = document.querySelector("[data-open-gift-guide]");

if (giftGuideDialog && openGiftGuideButton) {
  let giftGuideOpener = null;
  let pageScrollPosition = 0;
  let bodyStyleBeforeDialog = null;

  openGiftGuideButton.addEventListener("click", (event) => {
    if (typeof giftGuideDialog.showModal !== "function") return;
    event.preventDefault();
    giftGuideOpener = openGiftGuideButton;
    pageScrollPosition = window.scrollY;
    bodyStyleBeforeDialog = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    document.body.style.position = "fixed";
    document.body.style.top = `-${pageScrollPosition}px`;
    document.body.style.width = "100%";
    giftGuideDialog.showModal();
    giftGuideDialog.querySelector("[data-close-gift-guide]").focus();
  });

  giftGuideDialog.addEventListener("click", (event) => {
    if (event.target === giftGuideDialog) giftGuideDialog.close();
  });

  giftGuideDialog.addEventListener("close", () => {
    if (bodyStyleBeforeDialog) {
      document.body.style.position = bodyStyleBeforeDialog.position;
      document.body.style.top = bodyStyleBeforeDialog.top;
      document.body.style.width = bodyStyleBeforeDialog.width;
    }
    window.scrollTo(0, pageScrollPosition);
    giftGuideOpener?.focus();
  });

  giftGuideDialog.querySelector("[data-close-gift-guide]").addEventListener("click", () => giftGuideDialog.close());

  const zoomGuideButton = giftGuideDialog.querySelector("[data-toggle-guide-zoom]");
  zoomGuideButton.addEventListener("click", () => {
    const isZoomed = giftGuideDialog.classList.toggle("is-zoomed");
    zoomGuideButton.setAttribute("aria-pressed", String(isZoomed));
    zoomGuideButton.textContent = isZoomed ? "Tornar a mida normal" : "Ampliar imatge";
  });
}
