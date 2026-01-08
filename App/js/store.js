import { addToCart, getCartCount } from "./cart.js";

// ----- Data (objects/arrays) -----
export const PRODUCTS = [
  { id: 1, name: "Pro Diver", price: 74, tag: "Dress", img: "./images/products/pro-diver.jpg" },
  { id: 2, name: "Expedition Scout", price: 40, tag: "Sport", img: "./images/products/expedition-scout.jpg" },
  { id: 3, name: "Seascape Auto", price: 199, tag: "Dress", img: "./images/products/seascape-auto.jpg" },
  { id: 4, name: "Trail Runner", price: 89, tag: "Sport", img: "./images/products/trail-runner.jpg" },
  { id: 5, name: "City Classic", price: 129, tag: "Dress", img: "./images/products/city-classic.jpg" },
  { id: 6, name: "Aero Chrono", price: 159, tag: "Sport", img: "./images/products/aero-chrono.jpg" },
];

// ----- DOM helpers -----
function setCartBadge() {
  const el = document.getElementById("cart-badge");
  if (el) el.textContent = `Cart (${getCartCount()})`;
}

function renderGrid(list) {
  const grid = document.getElementById("store-grid");
  if (!grid) return;
  grid.innerHTML = ""; // clear
  for (let p of list) { // for…of loop
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<img src="${p.img}" alt="${p.name}" class="card-img" 
    style="width:100%;height:auto;border-radius:12px;
    margin-bottom:8px;object-fit:cover;" />
      <h4>${p.name}</h4>
      <p>$${p.price}</p>
      <p class="xsmall">Category: ${p.tag}</p>
      <button class="btn btn--accent btn--sm" data-add="${p.id}">Add to cart</button>
    `;
    grid.appendChild(card);
  }
  // Delegate: listen for buttons
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const pid = Number(btn.getAttribute("data-add"));
    addToCart(pid, 1);
    setCartBadge();
  }, { once: true }); // attach once per render
}

// ----- Shipping calculator (conditionals + logical ops) -----
export function shippingCostFor(age, points, cartValue, base = 9.99) {
  // guard clauses
  if (age == null || cartValue == null || points == null) return "Please fill all fields.";
  if (Number.isNaN(age) || Number.isNaN(cartValue) || Number.isNaN(points)) return "Use numbers only.";

  if (age > 21) {
    if (cartValue >= 300 || points >= 500) {
      return 0;
    } else {
      return base;
    }
  } else {
    // user is not over 21
    return base; // business decision for demo
  }
}

// ----- Promo switch -----
export function applyPromo(code) {
  const key = String(code || "").trim().toUpperCase();
  switch (key) {
    case "STUDENT":
      return { ok: true, message: "Student promo applied: 10% off" };
    case "FREESHIP":
      return { ok: true, message: "Free shipping applied" };
    default:
      return { ok: false, message: "Invalid promo code" };
  }
}

// ----- Filter helper -----
function filterProducts(category) {
  if (category === "all") return PRODUCTS;
  const out = [];
  for (let p of PRODUCTS) {
    if (p.tag === category) out.push(p); // conditional within loop
  }
  return out;
}

// ----- Init/wiring -----
function init() {
  setCartBadge();
  renderGrid(PRODUCTS);

  const calcBtn = document.getElementById("calcShipBtn");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const age = Number(document.getElementById("age").value);
      const cartValue = Number(document.getElementById("cartValue").value);
      const points = Number(document.getElementById("points").value);
      const result = shippingCostFor(age, points, cartValue);
      document.getElementById("shippingResult").textContent = String(result);
    });
  }

  const promoBtn = document.getElementById("applyPromoBtn");
  if (promoBtn) {
    promoBtn.addEventListener("click", () => {
      const code = document.getElementById("promoInput").value;
      const res = applyPromo(code);
      const el = document.getElementById("promoResult");
      el.textContent = res.message;
      el.className = "xsmall" + (res.ok ? " success" : " error");
    });
  }

  const filterBtn = document.getElementById("applyFilter");
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const val = document.getElementById("categoryFilter").value;
      renderGrid(filterProducts(val));
    });
  }
}

document.addEventListener("DOMContentLoaded", init);