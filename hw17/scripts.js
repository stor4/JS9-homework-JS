//Светофор

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

async function trafficLight(element){
    while (true){
        // включаем зеленый
        element.style.backgroundColor = 'green'
        await delay(10000).then((result) => console.log(`Зеленый работал: ${result} мс`))
        // включаем желтый
        element.style.backgroundColor = 'yellow'
        await delay(1500).then((result) => console.log(`Желтый работал: ${result} мс`))
        // включаем красный
        element.style.backgroundColor = 'red'
        await delay(15000).then((result) => console.log(`Красный работал: ${result} мс`))
    }
}

const square = document.createElement('div')
document.body.appendChild(square)
square.style = `
height: 200px;
width: 200px;
border: solid 1px black`

trafficLight(square)

//PedastrianTraficLight
function domEventPromise(element, eventName){
    function executor(resolve){
        //happy hacking
        function remover (result) {
            resolve(result)
            element.removeEventListener(eventName, remover)
        }
       element.addEventListener(eventName, remover)
    }
    return new Promise(executor)
}

// async function pedastrianTrafficLight(element){
//     while (true){
//         // включаем зеленый
//         element.style.backgroundColor = 'green'
//         await delay(5000).then((result) => console.log(`Зеленый работал: ${result} мс`))

//         // включаем красный
//         element.style.backgroundColor = 'red'
//         await delay(5000).then((result) => console.log(`Красный работал: ${result} мс`))
//     }
// }

const btn = document.createElement('button')
document.body.appendChild(btn)
btn.innerHTML = 'КНОПКА СВЕТОФОРА'

async function pedastrianTrafficLight(element){
    while (true){
        // включаем зеленый
        element.style.backgroundColor = 'red'
        await Promise.race([delay(15000), delay(5000).then(() => domEventPromise(btn, 'click'))])

        // включаем красный
        element.style.backgroundColor = 'green'
        await delay(10000)
    }
}

const square2 = document.createElement('div')
document.body.appendChild(square2)
square2.style = `
height: 100px;
width: 100px;
border: solid 1px black`

pedastrianTrafficLight(square2)



//

//gql

// function gql1 (url, queryText, variebles) {
//     function executor(resolve, reject) {
//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: {query: queryText,
//                    variebles
//             }
//         })

//     }
//     return new Promise(executor)
// }

function gql (url, queryText, variebles) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({query: queryText,
                   variebles
            })
        })
}

;(async () => {
    const catQuery = `query cats($q: String){
                                        CategoryFind(query: $q){
                                            _id name
                                        }
                                    }`
    const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql",  catQuery,  {q: "[{}]"})
    console.log(cats) //список категорий с _id name и всем таким прочим
    
    
    const loginQuery = `query login($login:String, $password:String){
                            	login(login:$login, password:$password)
                        }`
    
    const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery ,{login: "test457", password: "123123"})
    console.log(token)
})()

//jwt 

function isBase64(str) {
    if (str ==='' || str.trim() ==='') {
      return false;
    }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }
console.log(isBase64("eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ"))


function jwtDecode(token) {
    // debugger
    if (token == ''|| token === undefined || token.includes('.') === false) {
        return
    }
    const splited = token.split('.')
    console.log(splited)
    try {
        JSON.parse(atob(splited[1]))
    } 
    catch(error) {
        return
    } 
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw"
console.log(jwtDecode(token)) 
//{
//  "sub": {
//    "id": "632205aeb74e1f5f2ec1a320",
//    "login": "test457",
//    "acl": [
//      "632205aeb74e1f5f2ec1a320",
//      "user"
//    ]
//  },
//  "iat": 1668272163
//}

try {
    console.log(jwtDecode())         //undefined
    console.log(jwtDecode("дичь"))   //undefined
    console.log(jwtDecode("ey.ey.ey"))   //undefined
    
    console.log('до сюда доработало, а значит jwtDecode не матерился в консоль красным цветом')
}
finally{
    console.log('ДЗ, видимо, окончено')
}