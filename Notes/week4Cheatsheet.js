/* =========================================================
   Week 4 JavaScript Cheat Sheet (OOP + Errors)
   (Save as: week4-cheatsheet.js)
   ---------------------------------------------------------
   How to use:
   1) Include with <script src="week4-cheatsheet.js"></script>
   2) Open DevTools (F12) → Console
   3) Uncomment example lines to see results
   ========================================================= */


//Object-Oriented Programming (OOP) --> JavaScript
/*
Programming concept that organizes code into objects-collections of data(properties) and function(methods)
    allows us to give our set of code behavior

4 Pillars of OOP
1. Encapsulation --> Group your code --> protect data from direct Modification
2. Abstraction  --> hidden, only showing what is necesarry and hiding complexity
3. Inheritance  --> Allows for one class to extend to another and reuse its properties and methods
4. Polymorphism --> Allows classes to share the same method name but behave differently
*/


/* =========================================================
   PART A — CLASS SYNTAX (STEP-BY-STEP BUILD)
   ---------------------------------------------------------
   GOAL: understand every piece of class syntax by adding one
   feature at a time and explaining what it is.
   ========================================================= */

/*


STEP 1) Minimal class
- A "class" is a blueprint for objects
- `constructor` runs automatically when you do `new`
*/

// const newCar = {
//     brand: "Toyota",
//     model: "Camry",
//     start: function (){
//         console.log("The car has started!")
//     }
// }
// newCar.start();

class Car {
  constructor(brand, model) { // parameters → local variables for construction
    // `this` refers to the new object being created
    this.brand = brand;       // public property
    this.model = model;       // public property
  }
}
const c1 = new Car("Tesla", "Model 3"); // instance/object created from class
/*
const c1 = {
    brand: "Tesla",
    model: "Model 3"
}
*/
const newC2 = new Car("Ford", "Ranger");
/*
const newC2 = {
    brand: "Ford",
    model: "Ranger"
}
*/
console.log(c1.brand, c1.model);        // "Tesla", "Model 3"
console.log(newC2.brand, newC2.model);

/*
STEP 2) Instance methods (functions)
- Methods belong to the prototype; each instance can call them
*/
class CarV2 {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  start() {                         // instance method
    console.log(`${this.brand} ${this.model} started.`);
  }
  stop() {
    console.log(`${this.brand} ${this.model} stopped.`);
  }
}
const c2 = new CarV2("Toyota", "Camry");
const carv2 = new CarV2("Ford", "Bronco")
/*
const c2 = {
    brand: "Toyota",
    model: "Camry",
    start: start() {                        
    console.log(`${this.brand} ${this.model} started.`)}

    stop: stop() {
    console.log(`${this.brand} ${this.model} stopped.`);}

}
const carV2 = {
    brand: "Toyota",
    model: "Camry",
    start: start() {                        
    console.log(`${this.brand} ${this.model} started.`)}

    stop: stop() {
    console.log(`${this.brand} ${this.model} stopped.`);}

}

*/
// c2.start();
// c2.stop();


/*
STEP 3) Getters / Setters
- Control how properties are read/written (validation, formatting)
*/
class CarV3 {
  constructor(brand, model) {
    this._brand = brand;            // convention: underscore for backing field
    this._model = model;
  }
  get brand() {                     // getter → read as a property
    return this._brand;
  }
  set brand(value) {                // setter → write as a property
    if (!value) throw new Error("Brand required.");
    this._brand = value;
  }
  get fullName() {                  // computed value
    return `${this._brand} ${this._model}`;
  }
}
// const c3 = new CarV3("Ford", "Focus");
// console.log(c3.fullName);         // "Ford Focus"
// c3.brand = "Honda";               // uses setter
// console.log(c3.brand);

/*
STEP 4) Private fields (#) — Encapsulation
- Truly private to the class body; cannot be accessed outside
*/
class CarV4 {
  #miles = 0;                       // private field (encapsulated)
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
  drive(distance) {
    if (distance <= 0) throw new RangeError("Distance must be > 0");
    this.#miles += distance;        // only accessible here
  }
  get odometer() {                  // expose read-only view
    return this.#miles;
  }
}
const c4 = new CarV4("BMW","M3", 2025);
const newC4 = new CarV4("Ford", "Bronco");
newC4.drive(50);
c4.drive(42);
console.log(c4.odometer);         // 42
// console.log(c4.miles);           // ❌ SyntaxError (truly private)

/*
STEP 5) Static members
- Belong to the class itself, not instances (utilities, counters, factories)
*/
class CarV5 {
  static makes = new Set();         // shared across all instances (class-level)
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    CarV5.makes.add(brand);
  }
  static knownMakes() {             // call with CarV5.knownMakes()
    return [...CarV5.makes].sort();
  }
}
// const a = new CarV5("Audi","A4"); const b = new CarV5("Honda","Civic");
// console.log(CarV5.knownMakes());  // ["Audi","Honda"]

/*
STEP 6) Inheritance (extends / supe[r) — Reuse a base class
- ElectricCar gains Car methods + adds/overrides extra behavior
*/
class CarBase {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  start() { console.log(`${this.brand} ${this.model} started.`); }
  stop()  { console.log(`${this.brand} ${this.model} stopped.`); }
}
//extends, super() ---> constructor
class ElectricCar extends CarBase {
  #battery = 100;                   // private field: %
  constructor(brand, model, battery = 100) {
    super(brand, model);            // calls CarBase constructor
    this.#battery = battery;
  }
  charge(amount) {
    this.#battery = Math.min(100, this.#battery + amount);
  }
  get battery() { return this.#battery; }
}
const ev = new ElectricCar("Nissan","Leaf",80);
// ev.start(); 
// ev.charge(10); 
// console.log(ev.battery); // 90

/*
STEP 7) Polymorphism (override methods)
- Subclass can redefine a parent method, but share the same "interface"
*/
class GasCar extends CarBase {
  #fuel = 100;
  refuel(amount) { this.#fuel = Math.min(100, this.#fuel + amount); }
  start() {
    // override: same method name, different behavior
    if (this.#fuel <= 0) return console.log("Out of fuel.");
    console.log(`${this.brand} ${this.model} engine roars to life.`);
  }
}
const fleet = [
  new ElectricCar("Tesla","Model 3",75),
  new GasCar("Toyota","Corolla"),
];
fleet.forEach(car => car.start()); // both have start(), different behavior


/* =========================================================
   PART B — FOUR PILLARS (WITH CODE YOU CAN TRACE)
   ========================================================= */

/*
1) ENCAPSULATION — hiding internal details, protecting data
- Example: BankAccount uses #balance + methods for safe access
*/
class BankAccount {
  #balance;
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.#balance = balance;
  }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("Deposit must be > 0");
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
  getBalance() { return this.#balance; } // controlled read
}
// const ba = new BankAccount("Martin", 500);
// ba.deposit(50); ba.withdraw(25); console.log(ba.getBalance()); // 525

/*
2) ABSTRACTION — expose a simple API; hide complexity
- Example: Wallet.transferTo() hides the details of moving money
*/
class Wallet {
  #balance = 0;
  deposit(n)  { this.#balance += n; }
  withdraw(n) { if (this.#balance >= n) this.#balance -= n; }
  transferTo(otherWallet, amount) {
    // call two internal operations; caller only sees one simple method
    this.withdraw(amount);
    otherWallet.deposit(amount);
  }
  getBalance() { return this.#balance; }
}
// const w1 = new Wallet(), w2 = new Wallet();
// w1.deposit(100); w1.transferTo(w2, 40);
// console.log(w1.getBalance(), w2.getBalance()); // 60, 40

/*
3) INHERITANCE — extend a base class; reuse/augment behavior
- Example: ElectricCar extends CarBase (earlier) and adds battery logic
*/

/*
4) POLYMORPHISM — same method name, different behaviors in subclasses
- Example: GasCar.start() vs ElectricCar.start() (overrides)
- Code using "car.start()" doesn't care which specific subclass it is.
*/


/* =========================================================
   PART C — ERROR HANDLING (try / catch / finally / throw)
   ========================================================= */

/*
Common error types:
- SyntaxError    → invalid code structure (caught at parse time)
- ReferenceError → using a variable that doesn't exist
- TypeError      → wrong type used in an operation (e.g., 5() )
- RangeError     → value outside allowed range (e.g., Array(-1))
*/

/*
TRY / CATCH / FINALLY
- Use try for risky code; catch to handle; finally always runs
*/
function riskyOperation() {
  // throw new Error("Something went wrong!");
  return "OK";
}
try {
  const res = riskyOperation();
  // console.log("Result:", res);
} catch (err) {
  console.error("Caught:", err.message);
} finally {
  // console.log("Cleanup always runs.");
}

/*
THROW custom errors:
- Stop execution and signal a specific problem
*/
function validatePassword(password) {
  if (typeof password !== "string")
    throw new TypeError("Password must be a string");
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters long.");
  return true;
}
try {
  // validatePassword("short");
  validatePassword("correct-horse");
  // console.log("Password OK");
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}

/*
Conditional handling with instanceof:
- React differently to different error types
*/
try {
  // let arr = Array(-1); // RangeError
  // undefinedFunction(); // ReferenceError
} catch (e) {
  if (e instanceof RangeError) {
    console.warn("Range issue:", e.message);
  } else if (e instanceof ReferenceError) {
    console.warn("Reference issue:", e.message);
  } else {
    console.warn("Other issue:", e.name, e.message);
  }
}


/* =========================================================
   PART D — PRACTICE MINI-TASKS (UNCOMMENT TO TRY)
   ========================================================= */

// 1) Make a Rectangle class with width/height, getters, and area()/perimeter()
// class Rectangle {
//   #w; #h;
//   constructor(w,h){ if(w<=0||h<=0) throw new RangeError("Sides > 0"); this.#w=w; this.#h=h; }
//   get width(){ return this.#w; } get height(){ return this.#h; }
//   area(){ return this.#w * this.#h; }
//   perimeter(){ return 2*(this.#w + this.#h); }
// }
// const r = new Rectangle(3,4); // console.log(r.area(), r.perimeter());

// 2) Extend Rectangle → Square; enforce equal sides; override area()
// class Square extends Rectangle {
//   constructor(side){ super(side, side); }
//   area(){ return super.area(); } // same here but shows override point
// }
// const s = new Square(5); // console.log(s.area());

// 3) Create two classes with the same method name describe() and show polymorphism:
// class Cat { describe(){ console.log("Cat: soft and sneaky"); } }
// class Dog { describe(){ console.log("Dog: loyal and loud"); } }
// ;[new Cat(), new Dog()].forEach(pet => pet.describe());

/* =========================================================
   QUICK GLOSSARY
   ---------------------------------------------------------
   class           → blueprint for objects
   constructor     → runs on `new`, initializes instance
   this            → current instance reference
   get/set         → property accessors (validation, computed values)
   #private        → truly private fields (encapsulation)
   static          → class-level properties/methods
   extends/super   → inheritance keywords
   override        → redefine a parent method in a subclass (polymorphism)
   try/catch/finally → structured error handling
   throw           → manually raise an error
   instanceof      → check an object's type (class or error)
   ========================================================= */
