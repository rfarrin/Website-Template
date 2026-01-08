/* =========================================================
   Week 3 JavaScript Cheat Sheet
   (Save as: week3-cheatsheet.js)
   ---------------------------------------------------------
   How to use:
   1) Include this file with <script src="week3-cheatsheet.js"></script>
   2) Open DevTools (F12) → Console.
   3) Uncomment example lines to see results.
   ========================================================= */

//functoin statement syntax
// function name(params) {
//   // code
//   return value;
// }
/* =========================
   FUNCTIONS (CORE)
   =========================
   - A function is a reusable block of code with its own scope.
   - Call it to run it. If you don’t call it, it won’t run.
   - Return ends the function and hands back a value.
*/
/*
function addNumbers({a, b}) {
   return a + b;
}

*/


// Function Statement (HOISTED)
function add(a, b) {
  return a + b;
}
// console.log(add(2, 3)); // 5

// Function Expression (NOT hoisted)
const multiply = function (a, b) {
  return a * b;
};
// console.log(multiply(3, 4)); // 12

// Parameters vs Arguments
function greet(name) {               // name = parameter
  return `Hello, ${name}!`;
}
// console.log(greet("Alice"));      // "Alice" is an argument

// Return ends execution immediately
function firstEven(nums) {
  for (let n of nums) {
    if (n % 2 === 0) return n;
  }
  return null;
}
// console.log(firstEven([1,3,5,8,9])); // 8


/* =========================
   HOISTING (IMPORTANT)
   =========================
   - Function statements are hoisted.
   - Function expressions / arrow functions are NOT hoisted.
*/
// ok();                 // ✅ works (statement hoisted)
function ok(){ /*...*/ }

// notOk();             // ❌ ReferenceError
const notOk = function(){ /*...*/ };


/* =========================
   CALLBACKS
   =========================
   - A callback is a function passed into another function.
   - Used in array methods, event handlers, timers, etc.
*/

function doTwice(fn) {
  fn();
  fn();
}
// doTwice(() => console.log("Hi")); // "Hi" "Hi"


/* =========================
   ASYNCHRONY: setTimeout / setInterval
   =========================
   - setTimeout(fn, ms): run once after delay
   - setInterval(fn, ms): run repeatedly until cleared

   1. fetching data from a server 
      a. promises 
      b. async/await 
   2. waiting for user interactions (clicks, typing)
   3. animations or timed events
   4. scheduling tasks to run later
   5. waiting for resources to load (images, files)
   6. implementing delays or timeouts
   7. reading files asynchronously
   8. polling for updates or changes


let tick = 0;
const id = setInterval(() => {
  // console.log("tick", ++tick);
  if (tick >= 3) clearInterval(id); // stop after 3 times
}, 1000);

// setTimeout(() => console.log("Runs later"), 500);
*/

//setTimeout() ---> schedules a function to run after a specified delay (in milliseconds).
   //syntax: setTimeout(function, delay, arg1, arg2, ...);
   //function in milliseconds
/*examople:
   console.log("Start");
   setTimeout(function(message){
       console.log("This message is shown after 2 seconds: " + message);
   }, 2000, "Hello, World!");
   

   let myInterval = setTimeout(() => console.log("This runs after 3 second"), 3000);
   console.log("End");

   setTimeout(() => {
       clearTimeout(myInterval);
       console.log("Timeout cleared before it could run");
   }, 10000);

//setInterval() ---> repeatedly calls a function with a fixed time delay between each call.
   //syntax: setInterval(function, delay, arg1, arg2, ...);

//clearTimeout() ---> cancels a timeout previously established by calling setTimeout().

async function : a function that operates asynchronously via the event loop, using an implicit Promise to return its result. allows the use of await within it to pause execution until a Promise is resolved.
    syntax: async function name(params) { ... }
   example:async function = async () => { ... }

await : used to wait for a Promise to resolve or reject within an async function. It pauses the execution of the async function until the Promise is settled.
a promise is an object representing something that will exist in the future

   syntax: let result = await promise;
   example: let data = await fetchData();

//example:
function wait(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitExample(ms) {
   return new Promise((resolve) => {
       setTimeout(() => {
           resolve("Done waiting");
       }, ms);
   });   

}
//useage:
async function run(){
   console.log("Start waiting...");

   const result = await waitExample(2000);
   console.log(message); // "Done waiting"

   console.log("Finished waiting.");
}
*/
/* =========================
   ARROW FUNCTIONS
   =========================
   - Shorthand for function expressions.
   - `param => expression` (implicit return)
   - `param => { statements; return value; }` (block body)
   anything to the right of the arrow is returned automatically
*/

const square = x => x * x;
// console.log(square(5)); // 25

const toSentence = (first, last) => {
  const name = `${first} ${last}`;
  return `Hello, ${name}.`;
};
// console.log(toSentence("Martin", "Maldonado"));


/* =========================
   ARRAY METHODS (ESSENTIAL 5)
   =========================
   All take a callback with parameters like (value, index, array)
   
*/

// 1) forEach: iterate (no return)  -- take a callback function to run and execute it on each item in the array
const nums = [6, 4, 3, 2, 5, 1];
// nums.forEach(n => console.log(n));

// 2) map: transform → new array
const doubled = nums.map(n => n * 2);
// console.log(doubled); // [12,8,6,4,10,2]

// 3) filter: keep items that pass condition
const evens = nums.filter(n => n % 2 === 0);
// console.log(evens); // [6,4,2]

// 4) reduce: fold to a single value
const sum = nums.reduce((acc, n) => acc + n, 0);
// console.log(sum); // 21

// 5) sort: order items (⚠️ mutates!)
// Default compares as strings; provide a compare fn for numbers:
const asc = [...nums].sort((a, b) => a - b);
const desc = [...nums].sort((a, b) => b - a);
// console.log(asc, desc);

// Sort objects by key:
const users = [
  { name: "Martin", age: 33 },
  { name: "Bob", age: 44 },
  { name: "Stacy", age: 24 }
];
// console.table(users.sort((a,b) => a.age - b.age));

/* BONUS: find / some / every */
const found = nums.find(n => n > 4);     // first > 4
const anyEven = nums.some(n => n % 2==0);// true if any
const allPos = nums.every(n => n > 0);   // true if all
// console.log(found, anyEven, allPos);


/* =========================
   STRING & NUMBER QUICKIES
   ========================= */
const s = "Hello World";
// console.log(s.toLowerCase(), s.includes("World"), s.indexOf("o"));

const n = 12.3456;
// console.log(n.toFixed(2)); // "12.35"
// console.log(Number.isNaN(Number("abc"))); // true


/* =========================
   COMPARISONS & LOGIC
   =========================
   - Prefer strict equality (===, !==)
   - && and || short-circuit and return a value
*/

const age = 19;
const canVote = age >= 18 ? "Yes" : "No";
// console.log(canVote); // "Yes"

// Short-circuit defaults:
const inputName = "";
const displayName = inputName || "Guest";
// console.log(displayName); // "Guest"


/* =========================
   DOM BASICS (SELECT / CHANGE)
   =========================
   - These require a real HTML page with matching elements.
   - Uncomment if you have elements present in the DOM.
*/

// SELECT
// const title = document.getElementById("title");
// const firstPara = document.querySelector(".text");
// const allItems = document.querySelectorAll("li");

// CHANGE CONTENT
// if (title) title.textContent = "New Title";

// STYLES & CLASSES
// if (firstPara) {
//   firstPara.style.color = "skyblue";
//   firstPara.classList.add("highlight");
// }

// CREATE / APPEND
// const list = document.getElementById("list");
// if (list) {
//   const li = document.createElement("li");
//   li.textContent = "New Item";
//   list.appendChild(li);
// }


/* =========================
   EVENTS (INTERACTIVITY)
   =========================
   - addEventListener("event", handler)
   - handler can be a named function or an arrow function
*/

// const btn = document.getElementById("btn");
// if (btn) btn.addEventListener("click", () => alert("Clicked!"));

// Prevent form submit (stay on page):
// const form = document.getElementById("myForm");
// if (form) form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = form.querySelector("input")?.value || "";
//   console.log("Submitted:", value);
// });


/* =========================
   COMMON PATTERNS & PITFALLS
   =========================
   - Avoid mutating arrays while iterating; use map/filter.
   - Don’t forget `return` inside arrow function blocks.
   - `sort()` mutates the original array (clone with [...arr]).
   - Arrow functions don’t have their own `this` (lexical this).
*/

// Example: clone before sort
const original = [3,2,1];
const sortedClone = [...original].sort((a,b) => a-b);
// console.log(original, sortedClone);


/* =========================
   PRACTICE SNIPPETS (UNCOMMENT)
   ========================= */

// 1) Write a function that returns the average:
function average(arr) {
  if (!arr.length) return 0;
  const total = arr.reduce((acc, n) => acc + n, 0);
  return total / arr.length;
}
//console.log(average([10, 20, 30])); // 20

// 2) Use filter + map to get names of adults:
const people = [
  {name: "Ana", age: 17},
  {name: "Luis", age: 21},
  {name: "Mia", age: 19},
];
// console.log(people.filter(p => p.age >= 18).map(p => p.name)); // ["Luis","Mia"]

// 3) Debounce (basic idea): wait until user stops typing
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
// const onInput = debounce((v) => console.log("Search:", v), 300);
// onInput("w"); onInput("wa"); onInput("wat"); // only last runs


/* =========================
   QUICK GLOSSARY
   =========================
- Function Statement: `function f(){}` (hoisted)
- Function Expression: `const f = function(){}` (not hoisted)
- Arrow Function: `const f = x => x * 2`
- Callback: A function passed to another function
- setTimeout / setInterval: schedule tasks; clear with clearTimeout/clearInterval
- Array Helpers: forEach (iterate), map (transform), filter (keep), reduce (fold), sort (order)
- Event Listener: Runs when the event occurs (click, submit, input)
- Prevent Default: Keep the browser from doing its default action
*/


/* =========================================================
   End of Week 3 Cheat Sheet
   ========================================================= */
