
import { PRODUCTS } from "./store.js";

// Choose which products to feature.
// We are using the first 5 items for this carousel.
// Optional: filter by tag or category if desired (e.g., only "Dress" items).
const FEATURED = PRODUCTS.slice(0, 5);

const els = {
  img: document.getElementById("carouselImg"),
  title: document.getElementById("carouselTitle"),
  price: document.getElementById("carouselPrice"),
  link: document.getElementById("carouselLink"),
  prev: document.querySelector(".carousel .prev"),
  next: document.querySelector(".carousel .next"),
  dots: document.getElementById("carouselDots"),
};

let index = 0;            // which slide we are on (0, 1, 2, ...)
let timerId = null;       // will hold the setInterval id so we can stop/restart it
const AUTOPLAY_MS = 4000; // 4 seconds per slide

// Format a number like 129 → "$129.00"
function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

// Build the small clickable dots below the slide.
// The active slide’s dot gets the "is-active" class so it’s highlighted.
function renderDots() {
  if (!els.dots) return;
  els.dots.innerHTML = "";
  FEATURED.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "carousel__dot" + (i === index ? " is-active" : "");
    dot.dataset.go = String(i); // store the index we should go to if clicked
    els.dots.appendChild(dot);
  });
}

// Show slide #i by placing that product’s data into the HTML elements.
// - Set image src/alt so the picture appears.
// - Set the title text and the price text.
// - Update the dots so the correct one is marked active.
function renderSlide(i) {
  const item = FEATURED[i];
  if (!item || !els.img || !els.title || !els.price || !els.link) return;

  els.img.src = item.img;
  els.img.alt = item.name;
  els.title.textContent = item.name;
  els.price.textContent = money(item.price);
  els.link.href = "./store.html";  // clicking the slide goes to the Store page
  renderDots();
}

// Change the current index safely and then render it.
// The modulo (%) keeps us in range so we “wrap around” if we go past the ends.
function go(newIndex) {
  index = (newIndex + FEATURED.length) % FEATURED.length;
  renderSlide(index);
}

// Helpers for next/previous to keep code readable.
function next() { go(index + 1); }
function prev() { go(index - 1); }

// Start the automatic slide show (every AUTOPLAY_MS milliseconds).
function startAutoplay() {
  stopAutoplay();                 // avoid stacking multiple timers
  timerId = setInterval(next, AUTOPLAY_MS);
}

// Stop the automatic slide show (clears the timer).
function stopAutoplay() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

// Connect buttons and dots to our functions.
// - Clicking prev/next moves slides and restarts the autoplay.
// - Clicking a dot jumps to that slide and restarts the autoplay.
// - Hovering over the image pauses autoplay; leaving restarts it.
function bindEvents() {
  if (els.prev) els.prev.addEventListener("click", () => { prev(); startAutoplay(); });
  if (els.next) els.next.addEventListener("click", () => { next(); startAutoplay(); });

  if (els.dots) {
    els.dots.addEventListener("click", (e) => {
      const dot = e.target.closest("[data-go]");
      if (!dot) return;
      const i = Number(dot.dataset.go);
      go(i);
      startAutoplay();
    });
  }

  const viewport = document.querySelector(".carousel__viewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);
  }
}

// This runs after the HTML has loaded.
// - If we have products, render the first slide.
// - Attach the event listeners.
// - Start the autoplay so it advances automatically.
function initCarousel() {
  if (!FEATURED.length) return;
  renderSlide(index);
  bindEvents();
  startAutoplay();
}

document.addEventListener("DOMContentLoaded", initCarousel);
