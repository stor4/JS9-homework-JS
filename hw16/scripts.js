// 4atik

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// function jsonPost(url, data)
// {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();   
//         x.onerror = () => reject(new Error('jsonPost failed'))
//         //x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))

//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
//                 resolve(JSON.parse(x.responseText))
//             }
//             else if (x.status != 200){
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }

// // Интерфейс stage1

// const chat = document.createElement('div')
// document.body.appendChild(chat)

// const nick = document.createElement('input')
// chat.appendChild(nick)
// nick.placeholder = 'Ник'

// const text = document.createElement('input')
// chat.appendChild(text)
// text.placeholder = 'Текст'

// const btn = document.createElement('button')
// chat.appendChild(btn)
// btn.innerHTML = 'Отправить'

// btn.onclick = () => {
//     jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: nick.value, message: text.value})
// }

// //История чата stage2

// const history = document.createElement('div')
// chat.appendChild(history)

// const message = document.createElement('div')
// history.appendChild(message)
// // message.innerHTML = {func: "getMessages", messageId: 1}
// jsonPost("http://students.a-level.com.ua:10012",{func: "getMessages", messageId: 0})
//         .then(res => {
//             console.log(res)


       
//             // console.log(res.data[10789])

//             for(let result = Number(res.nextMessageId) - 1; result > 0; result--) {
//                 // console.log(res.data[result])
//                 const container = document.createElement('div')
//                 container.style = `
//                 display: flex;
//                 flex-direction: row`

//                 history.appendChild(container)
//                 const name = document.createElement('div')
//                 const msg = document.createElement('div')
//                 container.appendChild(name)
//                 container.appendChild(msg)
//                 name.style = `
//                 font-weight: bold;`

//                 name.innerHTML = `${res.data[result].nick}: `
//                 msg.innerHTML = res.data[result].message

//                 counter = Number(res.nextMessageId)
//                 // console.log(counter)
//             }

         
             
//         })


// //stage 3-4

// let counter
// // console.log(counter)

// function msgUpdate() {
//     jsonPost("http://students.a-level.com.ua:10012",{func: "getMessages", messageId: counter})
//     .then(res => {
//         // console.log(res)
//         for(let result = counter; result < Number(res.nextMessageId); result++) {
//             // console.log(res.data[result])
//             const container = document.createElement('div')
//             container.style = `
//             display: flex;
//             flex-direction: row`

//             history.prepend(container)
//             const name = document.createElement('div')
//             const msg = document.createElement('div')
//             container.appendChild(name)
//             container.appendChild(msg)
//             name.style = `
//             font-weight: bold;`

//             name.innerHTML = `${res.data[0].nick}: `
//             msg.innerHTML = res.data[0].message

//             // counter = Number(res.nextMessageId)
//             // console.log(counter)
//         }
//         counter = Number(res.nextMessageId)
//     })
    
// } 
// // ;(async () => {
// //     while(true) {
// //         await delay(5000)
// //         msgUpdate()
// //         // console.log(counter)
// //     }
// // }) ()

// //stage 5

// async function sendMessage(nick, message) {
//     await jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: nick, message: message})
// }

// async function getMessages() {
//     await jsonPost("http://students.a-level.com.ua:10012",{func: "getMessages", messageId: counter})
//     .then(res => {
//         // console.log(res)
//         for(let result = counter; result < Number(res.nextMessageId); result++) {
//             // console.log(res.data[result])
//             const container = document.createElement('div')
//             container.style = `
//             display: flex;
//             flex-direction: row`

//             history.prepend(container)
//             const name = document.createElement('div')
//             const msg = document.createElement('div')
//             container.appendChild(name)
//             container.appendChild(msg)
//             name.style = `
//             font-weight: bold;`

//             name.innerHTML = `${res.data[0].nick}: `
//             msg.innerHTML = res.data[0].message

//             // counter = Number(res.nextMessageId)
//             // console.log(counter)
//         }
//         counter = Number(res.nextMessageId)
//     })
// }

// btn.onclick = sendAndCheck

// async function sendAndCheck () {
//     await sendMessage(nick.value, text.value)
//     await getMessages()
// }

// async function checkLoop() {
//     while (true) {
//         await delay(2000)
//         await getMessages ()
//     }
// }

// checkLoop ()
 
// stage 6







//SWAPI Links

function isURL(str) {
    const pattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/i;
    return pattern.test(str);
}

// async function swapiLinks (url) {
//     let obj
//     await fetch(url).then(res => res.json())
//     .then(result => { 
//         obj = result
//     })
//     // debugger
//     for (let i in obj) {
//         if(i = 'url') {
//             continue
//         }

//         if(Array.isArray(obj[i])) {
//             for (let j in obj[i]) {
//                 // console.log(obj[i])
//                 await fetch(obj[i][j]).then(res => res.json())
//                 .then(result => obj[i][j] = result)
//             }
//         }

//         if(isURL(obj[i])) {
//             await fetch(obj[i]).then(res => res.json())
//             .then(result => obj[i] = result)
//         }
//     }
//     console.log(obj)
// }
// swapiLinks('https://swapi.dev/api/people/20')

// swapiLinks("https://swapi.dev/api/people/20/")
//     .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))





async function swapiLinks2 (url) {
    async function executor(resolve, reject) {
        // debugger
            let obj
            await fetch(url).then(res => res.json())
            .then(result => { obj = result})
            // debugger
            for (let i in obj) {
                if(i == 'url') {
                    continue
                }
        
                if(Array.isArray(obj[i])) {
                    for (let j in obj[i]) {
                        // console.log(obj[i])
                        await fetch(obj[i][j]).then(res => res.json())
                        .then(result => obj[i][j] = result)
                    }
                }
        
                if(isURL(obj[i])) {
                    await fetch(obj[i]).then(res => res.json())
                    .then(result => obj[i] = result)
                }
            }
            resolve(obj)
            console.log(obj)
    }
    return new Promise(executor)
}

// swapiLinks2('https://swapi.dev/api/people/20')

// debugger
// swapiLinks2("https://swapi.dev/api/people/20/")
//     .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))



//domEventPRomise

const knopka = document.createElement('button')
knopka.innerHTML = 'TEST'
document.body.appendChild(knopka)
// console.log(testButton)

// function domEventPromise(element, eventName){
//     function executor(resolve){
//         //happy hacking
//        element.addEventListener(eventName, ((result) => resolve(result)))
//        element.removeEventListener(eventName, ((result) => resolve(result)))
       
//     }
//     return new Promise(executor)
// }

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



// debugger
domEventPromise(knopka, 'click').then( e => console.log('event click happens', e))

// knopka.click(console.log())

















// for(let i = 0; i <)

// fetch("http://students.a-level.com.ua:10012")
//     .then(res => res.json())
//     .then(data => console.log(data))

