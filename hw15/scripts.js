// //fetch 
// Если юзать регулярки(не обязательно эту), то почему-то часть ссылок она просто пропускает, если проверять начало строки(как сейчас), то с фильмами оно не работает(так же как и регялрка).

function isURL(str) {
    const pattern = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/i;
    return pattern.test(str);
}

// function check (url) {
//     const testStr = 'http'
//     return testStr.substring(0, 3) === url.substring(0, 3)

// }

// function check(url) {
//     const testStr = 'http'
//     console.log(url)
//     return url.substring(0, 4) === testStr;
// }

function check(url) {
    const testStr = 'http';
    if (Array.isArray(url)) {
      return url.every(elem => elem.substring(0, 4) === testStr);
    } else {
      return url.substring(0, 4) === testStr;
    }
  }



function fetchBasic(parent, url) {
    fetch(url)
        .then(res => res.json())
        .then(result => {
            const table = document.createElement('table')
            table.border = `1px solid`
            table.style.margin = `30px 0 30px 0`
            parent.appendChild(table)

            const labels = document.createElement('tr')
            table.appendChild(labels)
            const values = document.createElement('tr')
            table.appendChild(values)

            for (let params in result) {
                const th = document.createElement('th')
                labels.appendChild(th)
                th.innerHTML = params

                const td = document.createElement('td')
                values.appendChild(td)

                const paramValue = result[params]

                if(result[params] < 1) {
                    continue
                }
                else if (Array.isArray(paramValue)) {
                    const button = document.createElement('button')
                    td.appendChild(button)
                    button.innerText = 'More info'
                    button.onclick = () => {
                        paramValue.forEach(element => {
                            if (check(element)) {
                                fetchBasic(parent, element)
                            }
                        })
                    }
                } else if (check(paramValue)) {
                    const button = document.createElement('button')
                    td.appendChild(button)
                    button.innerText = 'Проверка на ссылку'
                    button.onclick = () => fetchBasic(parent, paramValue)
                } else {
                    td.innerHTML = paramValue
                }
            }
        })
}




fetchBasic(document.body, 'https://swapi.dev/api/people/1/')




//race

function delay(ms){ //промисифицированная функция для создания промиса, который резолвится через определенное время
    //функция-исполнитель, принимает два параметра - функции для передачи промису результата работы
    function executor(fulfill, reject){  //reject объявлен для вида.
        setTimeout(() => fulfill(ms), ms) //setTimeout запустит функцию, которая запустит fulfill через ms миллисекунд. Результатом промиса будет время задержки
    }
    
    //возврщаем новый промис, передав в него executor. Промис тут же его запускает, передав в него колбэки для управления состоянием
    return new Promise(executor) 
}

//const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

// delay(1000).then(result => console.log(`Секунда прошла. Результат промиса: ${result}`)) //так как delay возвращает промис, мы можем написать .then
//            .then(() => delay(2000)) //then возвращает новый промис, а значим мы можем продолжить цепочку then
//            .then(ms => console.log(`И еще две секунды прошло: ${ms}`)) 
// console.log('Промис инициализирован, ждем результатов')

const testPromise = new Promise((resolve, reject) => {
    fetch('https://swapi.dev/api/people/1/')
    // .then(res => console.log('Фетч отработал'))
})
// console.log(`Старт`)
// Promise.race([delay(100)],[testPromise]).then((value) => console.log(value))
// В среднем фетч отрабатывает за +-200 мс

//Promisify:confirm 

function confirmPromise(text) {
    function executor(fulfill, reject) {
        if(confirm(text) !== false) {
            fulfill()   
        }
        else reject()
    }
    return new Promise(executor)
}

// confirmPromise('Промисы это сложно?').then(() => console.log('не так уже и сложно'),
                                        //    () => console.log('respect за усидчивость и внимательность'))


//Promise: prompt

function promptPromise (text) {
    function executor(fulfill, reject) {
        let test = prompt(text)
        console.log(test)
        if (typeof(test) == 'string' && test !== '') fulfill(test)
        else reject()
    }
    return new Promise(executor)
}

// promptPromise("Как тебя зовут?").then(name => console.log(`Тебя зовут ${name}`), 
                                    //   () => console.log('Ну зачем морозиться, нормально же общались'))

//Promise: LoginForm 

function Password(parent, open){
    // let passwordValue
    let passwordInput 
    
    this.passwordInput = document.createElement('input')
    this.passwordInput.setAttribute('type', 'password')
    parent.appendChild(this.passwordInput)
    // passwordValue = passwordInput.value
    this.passwordInput.placeholder = 'Пароль'

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    parent.appendChild(checkbox)
    
    this.passwordInput.type = open ? 'text' : 'password'
    checkbox.checked = open
    

    this.getValue = function() {
        return passwordInput.value
    }

    this.setValue = function(newPassword) {
        return passwordInput.value = newPassword
    }
    this.setOpen = function(value) {
        if (value === true) {passwordInput.setAttribute('type', 'text')}
        else if (value === false) {passwordInput.setAttribute('type', 'password')}
    }

    this.getOpen = function() {
        return passwordInput.getAttribute('type') !== 'password'
    }
    this.onChange = function() {
        return passwordInput.oninput = function() {
            return this.value
        } 
    }

    this.passwordInput.addEventListener('input', () => {
        if (this.onChange) {
          this.onChange(this.passwordInput.value)
        }
      })
        
    checkbox.addEventListener('change', () => {
       this. passwordInput.type = checkbox.checked ? 'text' : 'password'
        if (this.onOpenChange) {
            this.onOpenChange(checkbox.checked)
        }
    })
}

// function LoginForm (parent) {
//     const container = document.createElement('div')
//     parent.appendChild(container) 

//     const login = document.createElement('input')
//     login.type = 'text'
//     container.appendChild(login)
//     login.placeholder = 'Логин'

//     let password = new Password(container, true)

//     const button = document.createElement('button')
//     container.appendChild(button)
//     button.innerText = 'Войти'

//     login.addEventListener('input', () => {
//         if (login.value == '' || password.passwordInput.value == '') {
//             button.disabled = true 
//         }
//         else button.disabled = false
//     })

//     password.onChange = function(value) {
 
//     if (login.value == '' || password.passwordInput.value == '') {
//             button.disabled = true 
//     }
//     else button.disabled = false}
// }

function LoginForm (parent) {
    const container = document.createElement('div')
    parent.appendChild(container) 

    let login

    this.login = document.createElement('input')
    this.login.type = 'text'
    container.appendChild(this.login)
    this.login.placeholder = 'Логин'

    let password 
    this.password = new Password(container, true)

    let button

    this.button = document.createElement('button')
    container.appendChild(this.button)
    this.button.innerText = 'Войти'

    this.login.addEventListener('input', () => { 
        this.password.onChange = value => {
            this.login.addEventListener('input', () => {
                if (this.login.value === '') {
                    this.button.disabled = true
                }
            })
            if(value == '') {
                this.button.disabled = true
            }
            
        }
        if (this.login.value === '') {
            this.button.disabled = true
        }
        else this.button.disabled = false

    })

    this.password.onChange = value => {
        this.login.addEventListener('input', () => {
            if (login.value === '') {
                button.disabled = true
            }
        })
    if (login.value === '') {
        this.button.disabled = true
    }
    else this.button.disabled = false}

    this.getValue = function () {
        return `${this.login.value} ${this.password.getValue()}`
    }

    this.setValue = function(loginValue, passwordValue) {
        return this.login.value = loginValue, this.password.setValue(passwordValue)
    }

    this.passwordSetOpen = function(value) {
        this.password.setOpen(value)
    }

   this.passwordGetOpen = function() {
        this.password.getOpen()
   }

}



function loginPromise(parent){
    function executor(resolve, reject){
        const form = new LoginForm(parent)
        form.button.onclick = () => {
            if (form.login.value && form.password.passwordInput.value) {
                resolve({ login: form.login.value, 
                           password: form.password.passwordInput.value})


            } else reject()
        }

        
    }
    
    return new Promise(executor)
}

// loginPromise(document.body).then(({login, password}) => console.log(`Вы ввели ${login} и ${password}`))
