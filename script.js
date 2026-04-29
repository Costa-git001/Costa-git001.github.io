const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const form = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const canvas = document.querySelector("#portraitCanvas");
const ctx = canvas.getContext("2d");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
  drawPortrait();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks. Your message is ready to connect to an email or form service.";
  form.reset();
});

function cssValue(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawPortrait();
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawPortrait() {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const accent = cssValue("--accent");
  const warm = cssValue("--warm");
  const ink = cssValue("--ink");
  const surface = cssValue("--surface");

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(0.52, warm);
  gradient.addColorStop(1, ink);
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.18;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.translate(width * 0.5, height * 0.53);
  ctx.rotate(-0.1);

  ctx.fillStyle = surface;
  drawRoundedRect(-width * 0.24, -height * 0.26, width * 0.48, height * 0.48, 22);
  ctx.fill();

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.arc(0, -height * 0.16, width * 0.105, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = warm;
  ctx.beginPath();
  ctx.ellipse(0, height * 0.11, width * 0.18, height * 0.13, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-width * 0.13, height * 0.08);
  ctx.quadraticCurveTo(0, height * 0.2, width * 0.13, height * 0.08);
  ctx.stroke();

  ctx.restore();

  for (let index = 0; index < 12; index += 1) {
    const x = (index * 67) % width;
    const y = (index * 113) % height;
    const size = 18 + (index % 4) * 12;

    ctx.strokeStyle = index % 2 === 0 ? accent : warm;
    ctx.globalAlpha = 0.38;
    ctx.lineWidth = 2;
    drawRoundedRect(x, y, size * 2.2, size, 8);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
