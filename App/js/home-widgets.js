import { PRODUCTS } from "./store.js";
import { getCartCount } from "./cart.js";

/* ---------- helpers ---------- */

function money(n) {
    return `$${Number(n).toFixed(2)}`;
}

function avg(nums) {
    if (!nums.length) return 0;
    return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function byTag(list) {
    return list.reduce((acc, p) => {
        acc[p.tag] = (acc[p.tag] || 0) + 1;
        return acc;
    }, {});
}

/* ---------- 1) FEATURES: quick category summary line ---------- */
function renderFeatureSummary() {
    const featuresSection = document.getElementById("features");
    if (!featuresSection) return;

const counts = byTag(PRODUCTS);
const prices = PRODUCTS.map(p => p.price);
const avgPrice = avg(prices);

// inject summary under the last .container within #features
const containers = featuresSection.querySelectorAll(".container");
const target = containers[containers.length - 1] || featuresSection;

const note = document.createElement("p");
note.className = "xsmall";
note.style.margin = "8px 0 0";
note.style.color = "var(--btn-primary-gradient-start)"; // brighter for visibility
const dress = counts["Dress"] ?? 0;
const sport = counts["Sport"] ?? 0;
note.textContent = 
    `Live store snapshot — Categories: Dress (${dress}), Sport (${sport}) · Avg Price: ${money(avgPrice)}`;

target.appendChild(note);
}

/* ---------- 2) ABOUT: live product stats card (brighter title) ---------- */
function renderAboutStats() {
    const about = document.getElementById("about");
    if (!about) return;

// try to append in the left column; fallback to the section
const leftCol = 
    about.querySelector(".grid > div:first-child") ||
    about.querySelector(".grid .container") ||
    about;
const target = leftCol || about;

const prices = PRODUCTS.map(p => p.price).sort((a, b) => a - b);
if (!prices.length) return;

const total = PRODUCTS.length;
const min = prices[0];
const max = prices[prices.length - 1];
const avgPrice = avg(prices);

const box = document.createElement("div");
box.className = "card";
box.style.marginTop = "12px";
box.style.padding = "12px 16px";
box.style.color = "var(--heading-color)";
box.innerHTML = `
    <h3 style="margin:0 0 6px 0; color: var(--btn-primary-gradient-start);">
      Store Stats (Live)
    </h3>
    <dl style="display:grid;grid-template-columns:auto 1fr;gap:6px;margin:0;">
      <dt>Total Products:</dt><dd>${total}</dd>
      <dt>Lowest Price:</dt><dd>${money(min)}</dd>
      <dt>Highest Price:</dt><dd>${money(max)}</dd>
      <dt>Average Price:</dt><dd>${money(avgPrice)}</dd>
    </dl>
  `;
target.appendChild(box);
}

/*------------3) Testamonials: simple rotator ----------*/

function initTestimonials() {
    const host = document.getElementById("testimonials");
    if (!host) return;

    const quotes = host.querySelectorAll("blockquote.quote");
    if (!quotes.length) return;

    let i = 0;
    const hide = p => (quotes.style.display = "none");
    const show = p => (quotes.style.display = "");

    quotes.forEach(hide);
    show(quotes[0]);

    setInterval(() => {
        hide(quotes[i]);
        i = (i + 1) % quotes.length;
        show(quotes[i]);
    }, 4000);
}

/* ---------- 4) CONTACT: save messages to localstorage ---------- */

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector("[name='name']").value.trim();
        const email = form.querySelector("[name='email']").value.trim();
        const message = form.querySelector("[name='message']").value.trim();

        if (!name || !email || !message) return;

        const record = { name, email, message, date: new Date().toISOString() };
        const KEY = "contact_messages";
        const existing = JSON.parse(localStorage.getItem(KEY)) || [];
        existing.push(record);
        localStorage.setItem(KEY, JSON.stringify(existing));
        alert("Thank you for your message!");
        form.reset();
        
    });
}

/* ---------- CART BADGE: reflect current cart count ---------- */
function updateCartBadge() {
    const el = document.getElementById("cart-badge");
    if (!el) return;
    el.textContent = `Cart (${getCartCount()})`;
}

/*----------6) Click "Dark mode" button to toggle dark mode ----------*/
function initThemeCardToddle() {
    const card = Array.from(document.querySelectorAll(".feature-card"))
        .find( el => el.textContent && el.textContent.includes("Dark Mode Support"));

    if (!card) return;

    card.style.cursor = "pointer";
    card.title = "Click to toggle theme";

    card.addEventListener("Click", () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.serItem("theme", next);

    })
}

/* ---------- INIT ALL ---------- */
document.addEventListener("DOMContentLoaded", () => {
    try {
        renderFeatureSummary();
        renderAboutStats();
        initTestimonials();
        initContactForm();
        updateCartBadge();
        initThemeCardToggle();
    } catch (err) {
        console.error("Home widgets error: ", err);
    }
});
