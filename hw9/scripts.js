// // document.body.style.backgroundColor = 'red'
document.title = "ГЫГЫ";


// fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
//      .then(data => {
//             //эта функция запускается когда данные скачиваются.
//             //остальной код работает РАНЬШЕ.
//             //только ТУТ есть переменная data со скачанными данными
//             for(currency in data.rates) {
//                 const btn = document.createElement('button')
//                 document.body.appendChild(btn)
//                 btn.innerText = currency
//                 const value = currency
//                 btn.onclick = () => {const amount = Number(prompt("Enter amount:"))
//                 console.log(amount * Number(data.rates[value]))
//             }  
//             }
//             console.log(data) //изучите структуру, получаемую с сервера в консоли
// })


        
// fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
//         .then(data => {
//                //эта функция запускается когда данные скачиваются.
//                //остальной код работает РАНЬШЕ.
//                //только ТУТ есть переменная data со скачанными данными
//                console.log(data) //изучите структуру, получаемую с сервера в консоли
               
//                for(currency in data.rates) {
//                 const fromOption = document.createElement('option')
//                 fromOption.innerText = currency
//                 from.appendChild(fromOption)
//                 const toOption = document.createElement('option')
//                 toOption.innerText = currency
//                 to.appendChild(toOption)
//                }
//                let value1
//                let value2
//                const currencyValue = currency

//                let result1
//                let result2

//                from.onchange = () => {
//                value1 = document.getElementById('from').value;
//                console.log(data.rates[currencyValue])}

//                to.onchange = () => {
//                 value2 = document.getElementById('to').value;
//                 result2 = data.rates[currencyValue]
//                 console.log(result2)}

//                 rate.innerText(result2)

               


// })


fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json').then(res => res.json())
     .then(data => {
            //эта функция запускается когда данные скачиваются.
            //остальной код работает РАНЬШЕ.
            //только ТУТ есть переменная data со скачанными данными
            console.log(data) //изучите структуру, получаемую с сервера в консоли
            
            for (countries in data) {
                const countriesList = document.createElement('option')
                countriesList.innerText = countries
                country.appendChild(countriesList)
                countriesList.value = countries
                const citySelector = document.getElementById('countriesList')
            }


            country.onchange = () => {
                citySelect.innerText = ''

                let value = document.getElementById('country') 
                // console.log(country.value)
                // console.log(data[value])

                for (city in data[country.value]) {
                const citiesList = document.createElement('option')
                citySelect.appendChild(citiesList) 
                citiesList.innerText = data[country.value][city]    
                // console.log(city[2])
                } 
            }
            
            
        })



// dom multiply table +




// let table2 = document.createElement("table");

// document.body.append(table2);

// for (let i = 1; i < 10; i++) {
//   let tr = document.createElement("tr");

//   table2.appendChild(tr);
//   tr.onmouseover = () => tr.style.backgroundColor = 'blue'
//   tr.onmouseout = () => tr.style.backgroundColor = 'white'
  
//   for (let j = 1; j < 10; j++) {
//     let td = document.createElement("td");
    
//     tr.appendChild(td);
//     td.innerText = i * j;
//     td.onmouseover = () => tr.style.backgroundColor = 'red'
//     td.onmouseout = () => tr.style.backgroundColor = 'white'
//   }
// }

//dom highlight cell +-

//dom highlight cross -