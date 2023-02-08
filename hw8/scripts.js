//blocks

let a = 10
{
    let b = 20
    {
        let c = 30
        //какие тут будут значения переменных a,b,c,d
        // a = 100, b = 21, c = 30
        b++
        a *= 10
    }
    {
        let c = 50
        //какие тут будут значения переменных a,b,c,d
        // a = 100, b = 521, c = 50
        b += 500
    }
    {
        const a = 100500
        const d = "value"
        //какие тут будут значения переменных a,b,c,d
        // a = 100500, b = 521, c = "value"
        {
            let a = -50
            b     = 1000
            //какие тут будут значения переменных a,b,c,d
            // a = -50, b = 1000
        }
        //какие тут будут значения переменных a,b,c,d
        // a = 100500, b = 1000, c = "value"
    }
    //какие тут будут значения переменных a,b,c,d
    // a = 100, b = 1000
}
//какие тут будут значения переменных a,b,c,d
// a = 100

//comparison if

// var age = +prompt("Сколько вам лет?","");
// if (age == 0 || age <0) {
//     alert("а вы живы?")
// }
// else {if (age < 18){
//     alert("школьник");
// }
// else {if (age < 30){
//     alert("молодеж");
// }
// else {if (age < 45){
//     alert("зрелость");
// }
// else {if (age < 60){
//     alert("закат");
// }
// else {if (age > 60){
//     alert("как пенсия?");
// }
// else {
//     alert("то ли киборг, то ли KERNESS"); 
// }
// }
// }
// }
// }
// }

//switch sizes

//switch: if

// let color = prompt("Введите цвет","");
// if (color == "red" || color == "black") {
//     document.write("<div style='background-color: red;'>красный</div>");
//     document.write("<div style='background-color: black; color: white;'>черный</div>")
// }
// else if (color == "black") {
//     document.write("<div style='background-color: black; color: white;'>черный</div>")
// }
// else if (color == "blue" || color == "green") {
//     document.write("<div style='background-color: blue;'>синий</div>")
//     document.write("<div style='background-color: green;'>зеленый</div>")
// }
// else if (color == "green") {
//     document.write("<div style='background-color: green;'>зеленый</div>")
// }
// else {
//     document.write("<div style='background-color: gray;'>Я не понял</div>");
// }

//noswitch

// const noSwitch = (key, cases, defaultKey='default') => {
//     //проверка наличия key в cases
//     //если есть - достать значение по ключу. это будет функция. Запустить ее
//     //если нет - извлечь из объекта cases значение по ключу, имя которого лежит в переменной defaultKey. Запустить 
//     //пущай функция noSWitch возвращает то, что возвращает одна из функций из объекта
//     if (key in cases) {
//         cases[drink] ()
//     }
//     else {
//         cases.default()
//     }
// }


// const drink = prompt("Что вы любите пить")
// noSwitch(drink, {
//     воду: () =>  console.log('Самый здоровый выбор!'),
//     чай(){ 
//         console.log('Вкусная и полезная штука. Не переусердствуйте с сахаром')
//     },
//     "пиво": () => console.log('Хорошо летом, да в меру'),
//     виски: function(){
//         console.log('Да вы, батенька, эстет! Не забудьте лед и сигару')
//     },
//     default(){
//         console.log('шото я не понял')
//     }
// })

//Part 2
//while confirm

// while (confirm() == false) {
//     alert("Попробуй еще раз")
// }
// alert("Мега хорош")

//array fill

// const pushingArr = []
// let i

// while(i = prompt()) {
//     pushingArr.push(i)
// }
// console.log(pushingArr)

//array fill nopush

// const pushingArr2 = []
// let j
// let f = 0

// while (j = prompt()) {
//     pushingArr2[(f++)] = j
// }

// console.log(pushingArr2)

//infinite probability

// let iterrations = 0
// while (iterrations != -1) {
//     iterrations++
//     if (Math.random() > 0.9) {
//         alert(iterrations)
//         break
//     }
// }

// empty loop

// while(prompt() == false) {
// }

//progression sum
// let sum = 1

// for (let g = 0; g < 100; g++) {
//     sum += 3
//     console.log(sum)
// }

//chess one line

// let s1 = " "
// let s2 = "#"
// let result = ""

// for (let c = 0; c <= 5; c++) {
//     result += s1 + s2
// }
// console.log(result)

//numbers

// let str = ""

// for (let y = 0; y < 10; y++) {
//     str += '\n'

//     for(let u = 0; u < 10; u++) {
//         str += u 
//     }
// }
// console.log(str)

//chess

// let desk =''

// for (let k = 0; k < 5; k++) {
//     desk += '\n'

//     for(let o = 0; o < 10; o++) {
//         desk += '#' + '.' 
//     }
//     desk += '\n'
//     for(let o = 0; o < 10; o++) {
//         desk += '.' + '#' 
//     }
// }
// console.log(desk)

//cubes

// let testArr = [1,2,3,4,5]
// let test2 = []

// // test2 = testArr[4]**3
// for (let r in testArr) {
//     test2.push(testArr[r] ** 3)
// }
// console.log(test2)

//multiply table

// let table = Array(10);
// for (let h = 1; h < 10; h++) {
//   table[h] = [...Array(10)].map((_, j) => h * j);
// }
// console.log(table)

// let s = '';
// for (let i = 1; i < 10; i++) {
//   s += table[i].slice(1).join(' ') + '\n';
// }
// console.log(s);         
// console.log(table[5][5]); 

// read array of objects



//ромбик
// работает, но не так как надо(украден со stackoverflow)

// let size = 12
// let board = ''
// let out = '';

// for (let s = 0; s < (size / 2) - 1; s++) {
// out += '.';
// }

// for (let i = 0; i < size / 2; i++) {
// board += '# ';
// console.log(out, board);
// out = out.substring(0, out.length - 1);
// }

// for (let j = size / 2; j > 0; j--) {
// out += '.';
// board = board.substring(0, board.length - 2);
// console.log(out, board);
// }

// let str = ""

// for (let y = 0; y < 10; y++) {
//     str += '\n'

//     for(let u = 0; u < 10; u++) {
//         str += u 
//     }
// }
// console.log(str)