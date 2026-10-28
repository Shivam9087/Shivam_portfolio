const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    projects.forEach((project) => {
      project.hidden = category !== "all" && project.dataset.category !== category;
    });
  });
});

const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  frame.src = "";
  document.body.style.overflow = "";
};

document.querySelectorAll(".project-media").forEach((button) => {
  button.addEventListener("click", () => {
    frame.src = button.dataset.video + "?autoplay=1&rel=0";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Demo contact handler: opens the visitor's email app with the message pre-filled.
// For a production site, connect this form to Formspree, Web3Forms, or your own backend.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const project = document.getElementById("project").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${project}`);
  document.getElementById("formStatus").textContent =
    "Opening your email app… If it doesn't open, email hello@kaiedits.co directly.";
  window.location.href = `mailto:hello@kaiedits.co?subject=${subject}&body=${body}`;
});
