//console.log("Hello, World!");

//let names = "Manjit kaur";
//console.log(names);

//var ages = 23;
//console.log(ages);
 
//const isStudent = true;
//console.log(isStudent);

//console.log("Hey Suneha");

// let namee="Manjit";
// let name=`hello ${namee}`;
// //console.log(namee);
// //console.log(typeof (namee))


// var city="London";
// var city="Darjeeling";
// //console.log(city);

// let age="23";
// //console.log(age);
// const agee=18;
// //console.log( typeof(agee));

// //operators

// let a=19;
// let b=19;
// let c=a+b;
// let d=a-b;
// let e=a%b;
// let f=a*b;
// console.log(c);
// console.log(d);
// console.log(e);
// console.log(f);



// //loops
// for(i=5;i<=7;i++);
// console.log(i);

// let count = 0;
// while (count < 3) {
//   console.log(count);
//   count++; // Essential to avoid an infinite loop
// }


// let x = 5;
// do {
//   console.log("This will print exactly once.");
// } while (x < 3);

// const colors = ['red', 'green', 'blue'];
// for (const color of colors) {
//   console.log(color);
// }

// const user = { name: 'Alice', age: 25 };
// for (const key in user) {
//   console.log(`${key}: ${user[key]}`);
// }

// //statements
// //if (totalAmount > 100) {
//   //console.log("Discount applied");
// // else {
//   //console.log("Full price");


// for (let i = 1; i <= 5; i++) {
//   if (i === 3) {
//     break; // Stops the loop entirely when i hits 3
//   }
//   console.log(i); 
// }
// // Output: 1, 2
// // Execution stops before printing 3, 4, or 5.

// for (let i = 1; i <= 5; i++) {
//   if (i === 3) {
//     continue; // Skips the rest of the code block for i = 3
//   }
//   console.log(i);
// }
// // Output: 1, 2, 4, 5
// // Note that 3 is missing because it was skipped.

// function greet(name) {
//   return `Hello, ${name}!`;
// }   
// console.log(greet("Manjit"));

// function add(a, b) {
//     console.log(a + b);
// }
// add(5, 10); 

// const adding = function(a, b) {
//     return a + b;
// }
// console.log(adding(5, 10)); 

// const multiply = (a, b) => a * b;
// console.log(multiply(5, 10));

// const square = (x) => x * x;
// console.log(square(5));

// function greetUser(message) {
//     console.log(message + " " +this.namee );

// }
// const person = {
//     namee: "Manjit",

// };
// greetUser.call(person, "Hello"); 
 
// // Using apply
// function introduceYourself(age, city) {
//     console.log(this.namee + " is " + age + " years old and lives in " + city);
// }
// const student = { namee: "Manjit" };
// introduceYourself.call(student, 23, "London");

// //bind method

// function sayHello() {
//     console.log("Hello, " + this.namee);
// }
// const user1 = { namee: "Manjit" };
// const boundSayHello = sayHello.bind(user1);
// boundSayHello(); 


// //callback function
// function makepayment(amount, callback) {
//     console.log("Processing payment of $" + amount);
//     callback();
// }
// makepayment(100, function() {
//     console.log("Payment completed successfully.");
// });


//constructor function
// function Person(firstName, lastName, age) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
// this.fullName = function() {
//     return this.firstName + " " + this.lastName;
// }
// } ;

// //create objects using the constructor function
// const person1 = new Person("Manjit", "Kaur", 23);
// const person2 = new Person("Suneha", "Kaur", 20);
// console.log(person1.fullName()); 
// console.log(person2.fullName()); 

//constructor function
// function Person(first, last, age, eyecolor) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.eyeColor = eyecolor;
//   this.fullName = function() {
//     return this.firstName + " " + this.lastName;
//   };
// }

// //create objects using the constructor function
// const person3 = new Person("John", "Doe", 30, "blue");
// const person4 = new Person("Jane", "Smith", 25, "green");
// console.log(person3.fullName()); 
// console.log(person4.fullName()); 

//object destructuring with different variable names



//nested destructuring



//acessing object data


// Push , pop, unshift, shift, length, indexof, incudes, join, slice, splice, concat, reverse, sort, find, findindex, sum, tostring, flat

//array

// let allColors = ["blue", "pink", "skyblue"];
// console.log(allColors);

// //push
// allColors.push("date");
// console.log(allColors);

// //pop
// allColors.pop();
// console.log(allColors);

// //unshift
// allColors.unshift("elderberry");
// console.log(allColors);

// //shift
// allColors.shift();
// console.log(allColors);

// //length
// console.log(allColors.length);

// indexof
// //  console.log(allColors.indexOf("banana"));

// //incudes
// // console.log(allColors.includes("banana"));

// //join
// // console.log(allColors.join(", "));

// //slice
// // console.log(allColors.slice(1, 3));

// //
// // allColors.splice(1, 1, "blueberry");
// // console.log(allColors);

// //concat
// let moreColors = ["fig", "grape"];
// let allColors = allColors.concat(moreColors);
// console.log(allColors);

// //reverse
// allColors.reverse();
// console.log(allColors);

// //sort
// allColors.sort();
// console.log(allColors); 

// //find
// let foundColor = allColors.find(color => color.startsWith("b"));
// console.log(foundColor);

// //findindex
// let foundIndex = allColors.findIndex(color => color.startsWith("p"));
// console.log(foundIndex);

// //sum
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// console.log(sum);

//  //TOSTRING
// console.log(allColors.toString());

// //flat
// let nestedArray = [1, [2, 3], [4, [5, 6]]];
// let flatArray = nestedArray.flat(2);
// console.log(flatArray);


// sort
const numbers1 = [1,2,3,4,5];
numbers1.sort((a,b) => b-a);
console.log(numbers1);

// reduce
const cart = [500,1500,2500];
const totalAmount = cart.reduce((total,price) => total + price, 0);
console.log(totalAmount);

// map
let usersNames = [
    {name: "Jagjit Singh", age: 25},
    {name: "Manjit Kaur", age: 23},
    {name: "Komalpreet Kaur Saini", age: 23}
];
let userNames = usersNames.map(user => user.name);
console.log(userNames);


// filter
const numbers3 = [1,2,3,4];
const evens = numbers3.filter(num => num % 2 === 0);
console.log(evens);


//add, display, remove, update