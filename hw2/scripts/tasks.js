// Напиши скрипт, який розраховує індекс маси тіла людини. Для цього необхідно розділити вагу в кілограмах на квадрат висоти людини за метри.
 let weight = '88.3';
 let height = '1.75';

 const bmi = Number(weight) / (Number(height) * Number(height));
 console.log(Math.round(bmi)); // 28.8

 





//-----------------------------------

// Напиши скрипт, який виводить у консоль заокруглені вгору/вниз і т.д. Значення змінної value.
// Використовуй методи Math.floor(), Math.ceil() та Math.round(). Перевірте, що буде в консолі при значеннях 27.3 і 27.9.

console.log(Math.floor (27.3));
console.log(Math.ceil (27.3));
console.log(Math.round (27.3));

let value = 34.7

console.log(Math.floor (value));
console.log(Math.ceil (value));
console.log(Math.round (value));



// -----------------------------------

// Напиши скрипт, який переведе значення totalMinutes (кількість хвилин) у рядок у форматі годин і хвилин HH:MM.

// 70 покаже 01:10
// 450 покаже 07:30
// 1441 покаже 24:01


const totalMinutes = 450;

var hours = Math.floor(totalMinutes / 60);
var minutes = Math.floor(totalMinutes % 60);

minutes = (minutes < 10) ? '0' + minutes : minutes;
hours = (hours < 10) ? '0' + hours : hours;

console.log(`${hours} : ${minutes}`);


//-----------------------------------

/* 
 * Вивести на екран модальне вікно prompt з повідомленням "Enter the number".
 * Результат виконання модального вікна записати в змінну, значення якої вивести в консоль.
 * */

let input = prompt("Enter the number:");

console.log(input);

//-----------------------------------

/* 
   * За допомогою модального вікна prompt отримати від користувача два числа.
   * Вивести в консоль суму, різницю, добуток, поділ та залишок від поділу їх один на одного.
   * */

let number1 = Number(prompt("Enter the number1:"));
let number2 = Number(prompt("Enter the number2:"));

console.log(number1 + number2);
console.log(number1 - number2);
console.log(number1 * number2);
console.log(number1 / number2);
console.log(number1 % number2);