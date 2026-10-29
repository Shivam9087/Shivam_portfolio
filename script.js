
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    projects.forEach((project) => {
      project.hidden =
        category !== "all" && project.dataset.category !== category;
    });
  });
});

// Inline video playback: no modal, only one video plays at a time.
document.querySelectorAll(".project-media").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".project");
    if (!card) return;

    let video = card.querySelector(".inline-project-video");

    // Pause every other inline video first.
    document.querySelectorAll(".inline-project-video").forEach((other) => {
      if (other !== video) other.pause();
    });

    if (!video) {
      video = document.createElement("video");
      video.className = "inline-project-video";
      video.src = button.dataset.video;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      video.addEventListener("play", () => {
        document.querySelectorAll(".inline-project-video").forEach((other) => {
          if (other !== video) other.pause();
        });
      });

      button.insertAdjacentElement("afterend", video);
      button.style.display = "none";
    }

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Video playback failed:", error);
      }
    } else {
      video.pause();
    }
  });
});

// Navigation menu.
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

// Current year.
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const project = document.getElementById("project").value.trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nProject details:\n${project}`
  );

  document.getElementById("formStatus").textContent =
    "Opening your email app… If it doesn't open, email hello@kaiedits.co directly.";

  window.location.href =
    `mailto:hello@kaiedits.co?subject=${subject}&body=${body}`;
});

