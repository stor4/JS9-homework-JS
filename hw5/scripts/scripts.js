// 1. Напишіть функцію avg, яка повертає середнє значення переданого масиву (якщо довжина масиву дорівнює нулю, то має повернутися 0).


console.log(avg([0, 1, 2, 3, 4, 5])); // 2.5
console.log(avg([22, 34, 62, 99])); // 54.25
console.log(avg([])); // 0
console.log(avg([1000, 2056, 3444, 1237])); // 1934.25

function avg (array) {
    if (array == 0) {
        return 0
    }

    let summ = 0
    for (let i of array ) {
        summ += i ;   
    }
    //  console.log(summ)

    //  console.log(array.length)

    avgSumm = summ / array.length;
    return avgSumm
}

// // avg([1,2,3,4])

// //------------------------

// // 2. Напишіть функцію power для обчислення степені числа

function power (a, b){
    let degree = a;
    for (let i = 1; i < b; i += 1) {
         degree *= a;
    }
    return degree;
}


console.log(power(2, 3)); // 8
console.log(power(4, 2)); // 16
console.log(power(3, 4)); // 81
console.log(power(10, 3)); // 1000

//------------------------

// 3. Напишіть функцію squareDigits, яка приймає число та зводить у квадрат кожен символ.

function squareDigits (number) {
    arr = ('' + number).split('')
    splitResult = (arr.map(Number))
    
    for (let i in splitResult) {
        splitResult[i] = splitResult[i] ** 2;
    }

    let result = splitResult.join('')
    return result
}
// squareDigits(22)


    console.log(squareDigits(91)); // 811
    console.log(squareDigits(0)); // 0
    console.log(squareDigits(867)); // 643649
    // console.log(squareDigits2(91)); // 811
    // console.log(squareDigits2(0)); // 0
    // console.log(squareDigits2(867)); // 643649

//------------------------



// 4. Напишіть функцію isPalindrome, яка перевіряє, чи переданий рядок є паліндромом.
// Паліндром - це слово, фраза чи послідовність, які читаються так само як уперед, назад, наприклад, level.


function isPalindrome (str) {
    let check = "";
    for (let i = str.length - 1; i >= 0; --i) {
        check += str[i];
    }
    // console.log(check)
    // console.log(str)
    return str == check;
}

console.log(isPalindrome('level')); // true
console.log(isPalindrome('topot')); // true
console.log(isPalindrome('вимив')); // true
console.log(isPalindrome('анна')); // true
console.log(isPalindrome('алла')); // true
console.log(isPalindrome('дід')); // true
console.log(isPalindrome('ротатор')); // true
console.log(isPalindrome('радар')); // true
console.log(isPalindrome('привіт')); // false
console.log(isPalindrome('що')); // false
console.log(isPalindrome('that'));  // false


//------------------------

// 5. Написати функцію stringTransformer, яка буде трансформувати рядок за такими правилами:

// 1) Змінити регістр кожного знака, тобто. нижній регістр у верхній регістр, верхній регістр у нижній регістр. (наприклад 'FizzBuzz'-> 'fIZZbUZZ');
// 2) Змінити порядок слів на зворотний (наприклад, 'pen pineapple apple PEN' --> 'pen APPLE PINEAPPLE PEN'). // Done

function stringTransformer (str) {
    let i = ''
    let result = str.split('').map(((i) => {
        if (i.toLowerCase() == i) {
            return i.toUpperCase();
        }
        else {
            return i.toLowerCase();
        }
    })
    )
    result2 = result.join('')

let reversed = result2.split(" ").reverse().join(" ");

return reversed
}


 console.log(stringTransformer('torininGEN THE bEst'));
// BeST the TORININgen

console.log(stringTransformer('JavaScript IS cool LANGUAGE'));
// language COOL is jAVAsCRIPT


//------------------------

// 6. Реалізувати функцію, яка виконуватиме математичні операції з введеними користувачем числами

// Технічні вимоги:

// Взяти за допомогою модального вікна браузера два числа. ( функцією ) 
// Взяти за допомогою модального вікна браузера математичну операцію, яку потрібно здійснити. Сюди можна ввести +, -, *, /. ( функцією )
// Створити функцію, в якій провести запит чисел, мат. операції та виконати обчислення )
// Вивести у консоль результат виконання функції.
//
// Необов'язкове завдання додаткової складності:
//
// Після введення даних додати перевірку їхньої коректності.
// Якщо користувач не ввів числа, або при введенні вказав не числа - запитати обидва числа заново
// Якщо користувач вві неправильний символ - запитати ще раз

function getValue (firstNumber, secondNumber) {
    let tempArr = []
    firstNumber = parseInt(prompt("Enter first number: "))
    secondNumber = parseInt(prompt("Enter second number: "))
    tempArr.push(firstNumber)
    tempArr.push(secondNumber)
    return tempArr
}
// getValue()

function getOperator(operator) {
    do {
    operator = prompt("Input operator: ")
    } 
    while (operator != "+" && operator != "-" && operator != "*" && operator != "/")
   
    return operator 
}
// console.log(getOperator())
function calculate() {
    let numbers = getValue()
    let operator = getOperator()
    if (operator == "+") {
        return (numbers[0] + numbers[1])  
    }
    else if (operator == "-") {
        return (numbers[0] - numbers[1]) 
    }
    else if (operator == "*") {
        return (numbers[0] * numbers[1]) 
    }
    else if (operator == "/") {
        return (numbers[0] / numbers[1]) 
    }
    else {
        return 'Error'
    }
}
console.log(calculate()) 

//------------------------



// * https://www.codewars.com/kata/52fba66badcd10859f00097e

// * https://www.codewars.com/kata/54ff3102c1bad923760001f3