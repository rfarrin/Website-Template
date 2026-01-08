
/* =========================================================
   🔎 PROJECT CROSS‑REFERENCES — Where these concepts appear now
   (Search the quoted snippets in your files to jump to the spot)
   =========================================================

   📁 Auth/auth.js
   - Global/module scope:
       import { addUser, findUserByEmail, setCurrentUser, getCurrentUser } from "./mockDb.js";
   - Block scope + conditionals (validation guards):
       if (!firstName.value || !lastName.value || !email.value || !password.value || !confirm.value) { ... }
       if (password.value.length < 8) { ... }
       if (password.value !== confirm.value) { ... }
       if (!terms.checked) { ... }
   - Conditionals in login:
       if (!user || user.password !== password.value) { ... }
   - Template literals (string interpolation):
       `Welcome, ${firstName.value}! Account created...`
       `Great to see you, ${user.firstName}! Logging you in…`
       `Signed in as ${who.firstName} ${who.lastName} (${who.email})`
   - Functions + early returns:
       function showMessage(target, text, type = "error") { if (!target) return; ... }
   - Events:
       registerForm.addEventListener("submit", (e) => { e.preventDefault(); ... })
       loginForm.addEventListener("submit", (e) => { e.preventDefault(); ... })
   - (For Week 2 demos) — add small examples of switch/loops here inside the submit handlers or above them.

   📁 Auth/mockDb.js
   - Global/module scope & constants:
       const DB_KEY = "app_users"; const SESSION_KEY = "current_user";
   - Objects, arrays, and methods:
       return users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
       users.push(newUser);
   - JSON + localStorage:
       JSON.parse(localStorage.getItem(DB_KEY));
       localStorage.setItem(DB_KEY, JSON.stringify(users));
   - Conditionals:
       if (findUserByEmail(email)) { return { ok:false, error:"Email already registered." }; }
   - Type conversion:
       String(firstName).trim(), String(password)
   - (For Week 2 demos) — good place to show Object.freeze / Object.seal around newUser or a settings object (teaching-only).

   📁 App/index2.html
   - Global vs block scope in inline scripts:
       const toggleSwitch = document.querySelector('#checkbox');
       function switchTheme(e) { if (e.target.checked) { ... } else { ... } }
   - Conditionals:
       if (currentTheme) { ... }  if (currentTheme === 'dark') { ... }
   - Events:
       toggleSwitch.addEventListener('change', switchTheme);
       toggle.addEventListener('click', () => { ... });
   - localStorage:
       localStorage.getItem('theme'); localStorage.setItem('theme','dark');
   - DOM + template literals (logout chip):
       bar.innerHTML = ` ... ${who.firstName} ${who.lastName} ... `
   - (For Week 2 demos) — easy place to add small for/while examples tied to UI buttons.

   📁 Notes/week1-cheatsheet.js (reference only)
   - Supplemental examples for typeof, truthy/falsy, operators (still useful in Week 2).

   ⚠️ Not currently used in Week 1 files (add in Week 2):
   - switch (use the chooseDoor example from this cheatsheet)
   - Loops (while, do...while, for, for...of, for...in) beyond small array methods
   - Object.keys / values / entries (add a quick console demo)
   - break/continue (add a small for-loop demo button in App/index2.html)
   ========================================================= */


/* =========================================================
   Week 2 JavaScript Cheat Sheet (Scope, Conditionals, Loops, Arrays, Objects)
   Save as: week2-cheatsheet.js
   ---------------------------------------------------------
   How to use:
   1) Include in a page with <script src="week2-cheatsheet.js"></script>
   2) Open DevTools (F12) → Console
   3) Uncomment lines marked with // ➜ to demo outputs
   ========================================================= */

/* =========================
   1) SCOPE & PROGRAM BLOCKS
   =========================
   - Global scope: declared outside any { } block
   - Block scope: anything inside { } (if, for, functions, bare blocks)
   - 'let' and 'const' are block-scoped. 'var' is function-scoped (leaks out of blocks).
*/

// let globalScope = "This is on the global scope";
// // console.log(globalScope);
// // Global vs Block scope
// let counter;
// {
//   // entering a new program block
//   counter = 1;
//   {
//     // nested block has access to outer variables
//     console.log(counter); // 1
//     let randomVAr = 12;
    
//   }
  
// }
// console.log(randomVAr);
// counter += 1;
// // ➜ console.log(counter); // 2

// let height = 180;
// {
//   let weight = 70;
//   {
//      console.log(height); // 180 (outer scope)
//     {
//       console.log(weight); // 70 (block where declared)
//     }
//   }
//    console.log(weight); // ReferenceError (outside its block)
// }
// // console.log(weight);   // ReferenceError

// // 'var' leaks out of blocks (function-scoped)
// var h = 180;
// {
//   var w = 70;
//    console.log(h, w); // 180 70
// }
//  console.log(h, w);   // 180 70 (w leaked out)

/* =========================
   2) CONDITIONALS (if / else if / else) & NESTING
   ========================= */
//evaluates into true or false (....condition)
// if (condition) { ... } else { ... } else if (...) { ... }
// function shippingCostFor(userAge, points, cartValue, baseShipping = 9.99) {

// let cartValue = 299;
// let points = 1000;
// let baseShipping = 9.99;
// let userAge = 27;[]
// //comp operators ===, ==, >=, <...etc...
//   if (userAge >= 21) {
//     // nested condition
//     if (cartValue >= 300 && points >= 500) {//if(false && true) === if(false)
//       baseShipping = 0;
//       console.log(baseShipping);
//     } else {
//       console.log(baseShipping);
//     }
//   } else {
//     console.log("You must be over 21 to use this app");
//   }

/*
if(condition){
  //code to run if true
} else {
    code to run if false
}
*/

//if...else if()
/*
if(condition){
  code to run if its true
}else if(condition2){
  code to run if the first condition is false and 2nd condition is true
}else{
  default
}


*/

// let grade = 77;
// let randomvar;
// if(grade){
//   randomvar = "great job!"
//   console.log("A")
// }else if(grade > 80){
//   randomvar = "not bad"
//   console.log("B")
// }else if(grade > 75){
//   randomvar = "need some work but good job"
//   console.log("C")
// }else if(grade > 65){
//   randomvar = "need a lot work"
//   console.log("D")
// }else{
//   randomvar = "try harder"
//   console.log("F")
// }

// if(userRole === "admin"){
//   //give them and admin powers
// }else if(userRole === "editor"){
//   //give them editor powers
// }else if (userRole === "viewer"){
//   //give them limited powers
// }else{
//   //make them a guest
// }

// ➜ console.log(shippingCostFor(25, 100, 200)); // 9.99
// ➜ console.log(shippingCostFor(25, 600, 100)); // 0
// ➜ console.log(shippingCostFor(19, 0, 0));     // "You must be over 21..."

// Else-if ladder example
// function temperatureFeel(t) {
//   if (t > 90) return "It’s hot";
//   else if (t > 74) return "It’s nice out";
//   else return "It’s cold";
// }
// ➜ console.log(temperatureFeel(75)); // "It’s nice out"

/* =========================
   3) SWITCH STATEMENT
   ========================= */

/*
switch (expression/variable){
  case 1:
    code to run ===
    break;
  case 2:
    code to run===
    break
  case 3:
    code to run===
    break;
  default:
    code to run if all cases dont match expression !==
}


*/ /*
let userInput = "d"
// function chooseDoor(door) {
  let win = false;
  switch (userInput) {
    case "a":// "a" === userInput
      console.log("Wrong door, you lose.");
      break; // breaks out of the scope
    case "b"://"b" === userInput
      console.log("You win!!!");
      win = true;
      break;
    case "c"://"c" === userInput
      console.log("Wrong door, you lose!");
      break;
    default:
      console.log("Wrong input: choose a, b, or c");
  }
      */
// if(promoCode === "STUDENT" && promoCode === "Military"){
//   //give them both discounts
// }

// if(user !== "Guest"){
//   switch (key) {
//     case "STUDENT":
//       return { ok: true, message: "Student promo applied: 10% off" };
//     case "FREESHIP":
//       return { ok: true, message: "Free shipping applied" };
//     default:
//       return { ok: false, message: "Invalid promo code" };
//   }
// }
// let grade = "C";

// switch (grade){
//   case "A":
//     console.log("Pass");
//   case "B":

// }

  // if (win) {
  //   // ➜ console.log("Winner winner, chicken dinner!");
  // }
  // return win;
// }
// ➜ chooseDoor("b"); // try a/b/c

/* =========================
   4) LOOPS: while, do...while, for, for...of, for...in
   ========================= */
//second form of flow control
  //loops repeat code a given number of times
  //they continue until some condition is met or isnt met

// while: runs while condition is true
/*
syntax:
  while (condition){
    //code to run until  condition is false
  };
*/

// let n = 0;
// while (n <= 30) {
//    console.log(n);
//     n += 10;// n = n + 10
// };
//1 -> n = 0 -> 2. n = 10 -> 3. n = 20 -> 4. n = 30 -> 5. n = 40

// do...while: runs body at least once
// let count = 1;
// let keepGoing;

// do {
//     let userInput;
//      userInput = confirm("Do you want to continue")

// }while(userInput);

// while(true){
//   //code is going to run after IF  the conditon was true
// }

// do {
//   // NOTE: confirm() works in a real browser, not Node
//   keepGoing = confirm(`${count++} Continue Loop?`);
//   keepGoing = count <= 3; 
//   // 
//   // fallback for demo
//   // ➜ console.log("Loop body ran");
// } while (keepGoing);

// let count = 1;
// let stop = true


// do{
//   console.log(count);
//   count++
// if(count > 3){
//   stop = false
// }

// }while(stop)

// for: initialization; condition; increment
//for(initialization; condition; increment)
// for (let i = 0; i < 5; i++) {//i--
//    console.log("i =", i);
// };

// Looping through arrays with for
// const values = [10, 30, 50, 100];
// for (let i = 0; i < values.length; i++) {
//   console.log(i, values[i]);
// }
// //Reverse
// for (let i = values.length - 1; i >= 0; i--) {
//    console.log("rev", i, values[i]);
// }
// // Step by 2
// for (let i = 0; i < values.length; i += 2) {//i -= 2
//     console.log("step2", values[i]);
// }




// for...of: iterate values of an iterable (arrays, strings, etc.)
// const values = [10, 30, 50, 100];
// for(let i of values){
//   console.log(i)
// };



// function sumArray(arr) {
//   let sum = 0;
//   for (let value of arr) {
//     sum += value;
//   }
//   return sum;
// }
// ➜ console.log(sumArray([10, 30, 50, 100])); // 190

// let cities = [
//     { name: "New York", population: 18.65e6 },
//     { name: "Cairo", population: 18.82e6 },
//     { name: "Mumbai", population: 19.32e6 },
//     { name: "São Paulo", population: 20.88e6 },
//     { name: "Mexico City", population: 21.34e6 },
//     { name: "Shanghai", population: 23.48e6 },
//     { name: "Delhi", population: 25.87e6 },
//     { name: "Tokyo", population: 37.26e6 }
// ];

// for(let city of cities){
//   if(city.population > 20e6){
//     console.log(`${city.name} (${city.population})`)
//   }
// };

// for in loops through keys of an object
// for (let key in obj) {
//   console.log(key, obj[key]);
// }

let user = {
  name: "Calvin",
  age: 33,
  email: "example@gmail.com"
};

// whatever = keys in user

// for (let whatever in user) {
//   console.log(whatever, user[whatever]); // bracket notation with dynamic key
// }

//whatever = name, age, email



// Example: cities over 20M
// function bigCities(cities) {
//   const out = [];
//   for (let city of cities) {
//     if (city.population > 20e6) out.push(`${city.name} (${city.population})`);
//   }
//   return out;
// }
// ➜ console.log(bigCities([{name:"Tokyo",population:37.26e6},{name:"Cairo",population:18.82e6}]))

// for...in: iterate keys of an object
function logObjectValues(obj) {
  const vals = [];
  for (let key in obj) {
    vals.push(obj[key]); // bracket notation with dynamic key
  }
  return vals;
}
// ➜ console.log(logObjectValues({name:"Calvin", age:33})) // ["Calvin", 33]

/* =========================
   5) OBJECT UTILITIES
   ========================= */

// Object.keys / values / entries
function objectIntrospection(user) {
  return {
    keys: Object.keys(user),
    values: Object.values(user),
    entries: Object.entries(user),
  };
}
// ➜ console.log(objectIntrospection({name:"Calvin", email:"x@y"}))

// Object.freeze (shallow), Object.assign, Object.seal
function demoObjectTools() {
  const scores = Object.freeze({
    math: 90,
    science: 80,
    history: { american: 88, worldHistory: 90 }, // nested stays mutable (freeze is shallow)
  });

  const user = { name: "Calvin", surname: "Hart", age: 66, email: "e@e.com" };

  // merge: target <- sources
  Object.assign(user, scores); // copy props into user

  Object.seal(user); // can’t add/remove keys but can change existing values
  user.age = 67;     // OK
  // user.newKey = 1; // ignored in strict mode or fails silently

  return user;
}
// ➜ console.log(demoObjectTools())

/* =========================
   6) BREAK & CONTINUE
   ========================= */

// Skip "Felix", print others
function printExceptFelix(names) {
  const out = [];
  for (let i = 0; i < names.length; i++) {
    if (names[i] === "Felix") continue; // skip iteration
    out.push(names[i]);
  }
  return out;
}
// ➜ console.log(printExceptFelix(["Martin","Felix","Maldonado"])) // ["Martin","Maldonado"]

// Early stop with break
function firstThree() {
  const seen = [];
  for (let i = 0; i < 10; i++) {
    if (i === 3) break; // stop loop entirely
    seen.push(i);
  }
  return seen;
}
// ➜ console.log(firstThree()) // [0,1,2]

/* =========================
   7) NESTED LOOPS
   ========================= */

function nestedDemo() {
  const pairs = [];
  for (let i = 0; i < 3; i++) {           // outer loop
    for (let j = 0; j < 2; j++) {         // inner loop
      pairs.push([i, j]);
      // break; // uncomment to show breaking inner loop early
    }
  }
  return pairs;
}
// ➜ console.log(nestedDemo())

/* =========================
   8) ARRAY METHODS QUICK TOUR
   ========================= */

function arrayTour() {
  let names  = ["Martin","Felix","Maria","Alice","Maldonado","Bob"];
  let other  = ["Stacy","David","Izzy"];

  // concat: returns new array
  let all = names.concat(other);
  // ➜ console.log("concat →", all);

  // splice(start, deleteCount, ...items): in-place edit
  names.splice(1, 3, "Paul", "James"); // replace 3 items starting at index 1
  // ➜ console.log("after splice →", names);

  // slice(start, endExclusive): returns new array (non-destructive)
 let names2 = names.slice(2);
  // let names3 = names.slice(2, 4);
  // ➜ console.log("slice(2) →", names2);
  // ➜ console.log("slice(2,4) →", names3);

  // indexOf: find index or -1
  console.log("indexOf('Martin') →", names.indexOf("Martin"));

  // push / pop (end), unshift / shift (start)
  names.push("Nixon");
  names.unshift("Troy");
  names.pop();    // remove last
  // ➜ console.log("final names →", names);

  return { all, names };
}
// ➜ console.log(arrayTour())

/* =========================
   9) PRACTICE TASKS (for students)
   =========================
   1. Write a function that returns "adult" if age >= 18, otherwise "minor".
   2. Using a switch, return the number of days for a given month name.
   3. Sum an array using: (a) for, (b) while, (c) for...of
   4. Given an object {a:1,b:2,c:3}, use for...in to collect the values into an array.
   5. Create a function that returns a new array without the first and last elements (use slice).
   6. Write a function that inserts "X" at index 2 of an array (use splice).
   7. Use break to stop a loop when you encounter the value 0 in an array.
   8. Freeze an object, then try changing a nested property—observe behavior.
*/

/* =========================================================
   End of Week 2 Cheat Sheet
   ========================================================= */
console.log(globalScope);