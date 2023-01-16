// 1) Створити цикл на 10 ітерацій. На кожній ітерації якщо i парне, то вивести в консоль слово Fiz, якщо i не парне, то вивести в консоль слово Buz, якщо i кротну цифру 3, то вивести FizBuz.

for(let i = 1; i <= 10; i++ ){
   console.log(`Step ${i}`);

   if(i % 3 === 0) {
    console.log(`FizBuz`);
   }
   else {
    if (i % 2 === 0) {
    console.log(`Fiz`);
    }
    else {
    console.log(`Buz`);
    }
   }
}


// 2) Написати логіку знаходження факторіалу числа 10.

fact = 10
n = fact

for (let i = 1; i < n; i++) {
  fact *= i;
}

console.log(fact)


// 3) У пачці паперу 500 аркушів. За тиждень в офісі витрачається 1200 аркушів. Яку найменшу кількість пачок потрібно купити в офіс на 8 тижнів?

let papperPackage = 500;
let weekAmount = 1200;

console.log(Math.ceil(weekAmount * 8 / papperPackage))


// 4) Створити функцію, яка виведе у консоль номер поверху та номер під'їзду за номером квартири. Поверхів у нас 9, квартир на поверсі по 3

//Функція працює тільки з будинками на 4 підїзди
function getFloorNumber (n) {
if (isNaN(n) || n > 36*3 || n < 1) {
  console.log (`Invalid flat number`)
  return 0;
}



if (n > 27*3) {
  let floorNumber = Math.ceil((n/3) % 9);
  console.log (`4th entrance, floor number is ${floorNumber || 9}`);
}
else {
  if (n > 18*3) {
    let floorNumber = Math.ceil((n/3) % 9);
    console.log (`3rd entrance, floor number is ${floorNumber || 9}`);
  }
  else {
    if (n > 9*3) {
      let floorNumber = Math.ceil((n/3 % 9));
      console.log (`2nd entracne, floor number is ${floorNumber || 9}`);
    }
    else {
      if (n <= 27){
        let floorNumber = Math.ceil((n/3) % 9);
        console.log (`1st entrance, floor number is ${floorNumber || 9}`);
      }
    }
  }
}
}

getFloorNumber (54);


// 5) Вивести у консоль піраміду. Змінна вказує кількість рядків, з яких побудується піраміда. Піраміда повинна будуватися в однаковому візуальному вигляді між собою, але строго враховуючи кількість рядків


let rows = 5;
let string ="";

for(let i=1; i<=rows; i++) {

  for(let j=1; j<=rows-i; j++){
    string += " ";
  }
  for(let k=0; k<2*i-1; k++){
    string += "*";
  }
  string +="\n";
}
console.log(string)
