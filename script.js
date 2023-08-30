
// 1. Function constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  };
}

// Creating instances using the constructor
const person1 = new Person('Tom', 35);
const person2 = new Person('Jane', 30);

// Calling the method on the instances
person1.sayHello();  //  Hello, my name is Tom and I am 35 years old.
person2.sayHello();  //  Hello, my name is Jane and I am 30 years old.

// The new keyword is used to create new objects based on the constructor,
// and the this keyword inside the constructor refers to the newly created instance.
console.log("-------------------------------------------------------")


// 2. bind()
const personFemale = {
  name: 'Mariam',
  greet: function() {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

const boundGreet = personFemale.greet.bind(personFemale);
boundGreet(); // Hello, my name is Mariam.

// The bind method creates a new function with a specified context (this value)
// and any number of additional arguments that are "bound" to it.
// It doesn't immediately execute the function; instead,
//it returns a new function that you can call later.
console.log("-------------------------------------------------------");


// 3. call()
const personMale = {
  name: "John",
  greet: function (greeting) {
    console.log(`${greeting}, my name is ${this.name}.`);
  },
};

personMale.greet.call(personMale, "Hi"); // Hi, my name is John.

// The call method allows you to invoke a function with a specified context (this value)
// and a comma-separated list of arguments.
// The arguments are passed directly to the function.
console.log("-------------------------------------------------------");


// 4. apply()
const person = {
  name: 'Mike',
  greet: function(greeting, age) {
    console.log(`${greeting} my name is ${this.name} and I am ${age} years old.`);
  }
};

person.greet.apply(person, ['Hey', 20]); // Hey my name is Mike and I am 28 years old.

// The apply method is similar to call,
// but instead of passing individual arguments,
// it takes an array-like object of arguments. 
// This is useful when you have a function that accepts a variable number of arguments.
console.log("-------------------------------------------------------");

// 5. provide an example scenario 
// where using call or apply is more appropriate than bind
function calculateTotalPrice() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

const cart1 = [25, 15, 30, 10];
const cart2 = [50, 20, 15];

// Using call to calculate the total price for cart1
const totalPriceCart1 = calculateTotalPrice.call(null, ...cart1);
console.log(`Total price for cart1: $${totalPriceCart1}`); // Total price for cart1: $80

// Using apply to calculate the total price for cart2
const totalPriceCart2 = calculateTotalPrice.apply(null, cart2);
console.log(`Total price for cart2: $${totalPriceCart2}`); // Total price for cart2: $85

// In this example, the calculateTotalPrice function takes multiple arguments,
// representing the prices of items. Instead of modifying the function to accept an array,
// you can use call or apply to pass the elements of the array as individual
// arguments to the function. This approach is cleaner and allows you to
//reuse the existing function without modification.

// Using bind in this scenario wouldn't be appropriate because
// bind is used to create a new function with a fixed context,
// and you're not creating a new function but directly calculating the total price.
//call and apply fit the scenario well because they allow you to
//immediately invoke the function with the appropriate context and arguments.

console.log("-------------------------------------------------------");

console.log("-------------------------------------------------------");






// node script.js













