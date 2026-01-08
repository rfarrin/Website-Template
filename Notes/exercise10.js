/* =========================================================
   OOP EXERCISES (BEGINNER → BUILD UP)
   =========================================================
   RULES:
   - Only the first couple are fill-in-the-blank
   - After that, you write the code yourself
   - Use console.log to test everything
   - Focus: class syntax, constructor, this, methods, encapsulation,
            inheritance, polymorphism
========================================================= */


/* =========================
   SECTION 1: WARM-UP (FILL IN THE BLANK)
   ========================= */

// 1) Fill in the blanks to create a basic class
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

const car1 = new Vehicle("Toyota", "Camry");
// console.log(car1.make, car1.model);


// 2) Fill in the blanks to add a method
class Phone {
  constructor(brand) {
    this.brand = brand;
  }

  ring() {
    console.log(`${this.brand} is ringing...`);
  }
}

const p1 = new Phone("iPhone");
p1.ring();



/* =========================
   SECTION 2: REAL LIFE CLASSES (WRITE IT YOURSELF)
   ========================= */

// 3) Create a class User with:
//    - properties: username, email
//    - method: login() → logs "<username> logged in."
//    - method: logout() → logs "<username> logged out."
// Create 2 users and test login/logout.
class User {
   constructor(username, email) {
         this.username = username;
         this.email = email;
   }
   login() {
         console.log(`${this.username} logged in.`);
   }
   logout() {
         console.log(`${this.username} logged out.`);
   }
}

const user1 = new User("john_doe", "john@example.com");
const user2 = new User("jane_smith", "jane@example.com");

user1.login();
user2.login();
user1.logout();
user2.logout();



// 4) Create a class Product with:
//    - properties: name, price
//    - method: display() → logs "Product: <name> $<price>"
// Create 3 products and call display() on each.

class Product {
   constructor(name, price) {
         this.name = name;
         this.price = price;
   }
   display() {
         console.log ('Product: ' + this.name + ' $' + this.price);
   }

}

const product1 = new Product("Laptop", 999.99);
const product2 = new Product("Smartphone", 599.99);
const product3 = new Product("Headphones", 199.99);

product1.display();
product2.display();
product3.display();

// 5) Create a class ShoppingCart with:
//    - property: items (starts as an empty array)
//    - method: addItem(product) → adds product to items
//    - method: showItems() → logs each item name + price
// Create a cart, add products, then show them.
// (You can use .push inside addItem)
class ShoppingCart {
   constructor() {
      this.items = [];

   }
   addItem(product) {
      this.items.push(product);
   }
   showItems() {
      this.items.forEach (item => {
         console.log('Product: ' + item.name + ' $' + item.price);
      })
   }
}

const cart = new ShoppingCart();
cart.addItem(product1);
cart.addItem(product2);
cart.addItem(product3);
cart.showItems();





/* =========================
   SECTION 3: ENCAPSULATION (BANK ACCOUNT)
   ========================= */

// 6) Create a class BankAccount with:
//    - private field: #balance
//    - constructor(owner, startingBalance)
//    - method: deposit(amount) → increases balance
//    - method: withdraw(amount) → decreases balance ONLY if enough money
//    - method: getBalance() → returns the balance
// Create an account and test deposit/withdraw/getBalance.
// IMPORTANT: Try console.log(account.#balance) (it should error)

class BankAccount {
   #balance;
   constructor(owner, startingBalance) {
      this.owner = owner;
      this.#balance = startingBalance;
   }
   deposit(amount) {
      this.#balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
   }
   withdraw(amount) {
      if (amount <= this.#balance) {
         this.#balance -= amount;
         console.log(`Withdrew $${amount}. New balance: $${this.#balance}`);
      }
      else {
         console.log("Insufficient funds for withdrawal.");
      }
   }
   getBalance() {
      return this.#balance;
   }
}


/* =========================
   SECTION 4: INHERITANCE (BANK ACCOUNT TYPES)
   ========================= */

// 7) Create a subclass SavingsAccount that extends BankAccount:
//    - add property: interestRate
//    - method: addInterest() → adds interest to the current balance
// (Hint: interest = balance * interestRate, then deposit it)

class SavingsAccount extends BankAccount {
   constructor(owner, startingBalance, interestRate) {
      super(owner, startingBalance);
      this.interestRate = interestRate;
   }
   addInterest() {
      const interest = this.getBalance() * this.ineterestRate;
      this.deposit(interest);
   }
}




// 8) Create a subclass BusinessAccount that extends BankAccount:
//    - add property: overdraftLimit
//    - override withdraw(amount) so it allows going negative
//      down to -overdraftLimit (not beyond)
// Test both subclasses.
class BusinessAccount extends BankAccount {
   constructor(owner, startingBalance, overdraftLimit) {
      super(owner, startingBalance);
      this.overdraftLimit = overdraftLimit;
   }
   withdraw(amount) {
      if (amount <= this.getBalance() + this.overdraftLimit) {
         const newBalance = this.getBalance() - amount;
         // Directly manipulating private field is not allowed, so we use deposit/withdraw methods
         // Here we simulate the withdrawal by depositing a negative amount
         this.deposit(-amount);
         console.log(`Withdrew $${amount}. New balance: $${this.getBalance()}`);
      }
      else {
         console.log("Withdrawal exceeds overdraft limit.");
   }
   }
}


/* =========================
   SECTION 5: POLYMORPHISM (SAME METHOD NAME, DIFFERENT BEHAVIOR)
   ========================= */

// 9) Create an array called accounts that contains:
//    - one BankAccount
//    - one SavingsAccount
//    - one BusinessAccount
// Call withdraw(50) on each and observe behavior differences.
// (You may need to set balances so you can see the difference)


accounts = [   new BankAccount("Alice", 100),
   new SavingsAccount("Bob", 200, 0.05),
   new BusinessAccount("Charlie", 300, 100)
];
accounts.forEach(account => {
   account.withdraw(50);
});
console.log(accounts);

/* =========================
   SECTION 6: MINI PROJECT — VIDEO GAME CHARACTERS
   =========================
   Build a simple Character system.
*/

// 10) Create a class Character with:
//     - properties: name, health, attackPower
//     - method: attack(target)
//         logs: "<name> attacks <target.name> for <attackPower> damage!"
//         calls target.takeDamage(attackPower)
//     - method: takeDamage(amount)
//         subtracts from health
//         logs: "<name> now has <health> health."
//         if health <= 0, set health to 0 and log "<name> has been defeated!"
class Character {
   constructor(name, health, attackPower) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
   }
   attack(target) {
      console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);
      target.takeDamage(this.attackPower);
   }
   takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0){
         this.health = 0;
         console.log(`${this.name} has been defeated!`);
      } else {
         console.log(`${this.name} now has ${this.health} health.`);
      }
   }
}



// 11) Create two characters and make them fight (attack each other)
//     Example: hero attacks monster, monster attacks hero...
let hero = new Character("Hero", 100, 15);
let monster = new Character("Monster", 80, 10);
hero.attack(monster);
monster.attack(hero);
hero.attack(monster);
monster.attack(hero);
hero.attack(monster);
monster.attack(hero);




// 12) Create a subclass Warrior that extends Character:
//     - add method: powerStrike(target)
//         deals attackPower + 10 damage
//         logs: "<name> uses Power Strike!"

class Warrior extends Character {
   powerStrike(target) {
      const damage = this.attackPower + 10;
      console.log(`${this.name} uses Power Strike on ${target.name} for ${damage} damage!`);
      target.takeDamage(damage);
   }
}


// 13) Create a subclass Mage that extends Character:
//     - add method: fireball(target)
//         deals attackPower + 20 damage
//         logs: "<name> casts Fireball!"

class Mage extends Character {
   fireball(target) {
      const damage = this.attackPower + 20;
      console.log(`${this.name} casts Fireball on ${target.name} for ${damage} damage!`);
      target.takeDamage(damage);
   }
}


// 14) Create a small party (array) of characters:
//     - one Character
//     - one Warrior
//     - one Mage
// Loop through them and call attack() on the same target.
// This demonstrates polymorphism (shared method name: attack)

let party = [
   new Character("Rogue", 90, 12),
   new Warrior("Knight", 120, 18),
   new Mage("Sorcerer", 80, 14)
];
party.forEach(member => {
   member.attack(monster);
});




/* =========================
   SECTION 7: BONUS (MEDIUM CHALLENGE)
   ========================= */

// 15) Add a private field #isAlive to Character (starts true)
//     - If a character is defeated, set #isAlive to false
//     - Prevent dead characters from attacking
//       (If dead, log: "<name> cannot attack, they are defeated.")
class Character {
   #isAlive;
   constructor(name, health, attackPower) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.#isAlive = true;
   } 
   attack(target) {
      if (!this.#isAlive) {
         console.log(`${this.name} cannot attack, they are defeated.`);
         return;
      }
      console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);
      target.takeDamage(this.attackPower);
   }
   takeDamage(amount) {
      this.health -= amount;
      if (this.health <= 0){
         this.health = 0;
         this.#isAlive = false;
         console.log(`${this.name} has been defeated!`);
      } else {
         console.log(`${this.name} now has ${this.health} health.`);
      }    
   }
}