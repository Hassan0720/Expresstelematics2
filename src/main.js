const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

function closeMobileMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  mobileNav.hidden = true;
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.classList.toggle("is-open", shouldOpen);
    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    menuButton.setAttribute(
      "aria-label",
      shouldOpen ? "Close navigation menu" : "Open navigation menu",
    );
    mobileNav.hidden = !shouldOpen;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(inquiryForm);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const details = String(data.get("message") || "").trim();
    const message = [
      "Hello Express Telematics, I would like to enquire.",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      details ? `Details: ${details}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const whatsappUrl = `https://wa.me/917800333005?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    const openLink = document.createElement("a");
    openLink.href = whatsappUrl;
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.textContent = "Open WhatsApp";
    formStatus.replaceChildren(
      document.createTextNode(
        "Review your details and press Send in WhatsApp. If it did not open, ",
      ),
      openLink,
      document.createTextNode(". Your message is not stored on this website."),
    );
    const submitButton = inquiryForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.innerHTML = 'Open WhatsApp again <span aria-hidden="true">↗</span>';
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".service-card, .approach-steps article, .address-card, .contact-card, .instagram-card",
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

