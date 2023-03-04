// Person Constructor 

// function Person (name, surname,) {
//     let age
//     let fatherName
    
//     this.name = name
//     this.surname = surname
//     this.age = age
//     this.fatherName = fatherName

//     this.getName = function(){
//         return this.name
//     }

//     this.getSurname = function() {
//         return this.surname
//     }

//     this.getfatherName = function() {
//         return this.fatherName
//     }

//     this.getAge = function() {
//         return this.age
//     }

//     this.getFullName = function() {
//         return `${name} ${surname} ${this.fatherName || ''} ${this.age || ''}`
//     }

//     this.setName = function(newName) {
//         if (newName.charAt(0) === newName.charAt(0).toUpperCase()) name = newName
//         else return name
//         return newName
//     }

//     this.setSurname = function(newSurname) {
//         if (newSurname.charAt(0) === newSurname.charAt(0).toUpperCase()) surname = newSurname
//         else return surname
//         return newSurname
//     }

//     this.setfatherName = function(newfatherName) {
//         if (newfatherName.charAt(0) === newfatherName.charAt(0).toUpperCase()) fatherName = newfatherName
//         else return fatherName
//         return newfatherName
//     }

//     this.setAge = function() {
//         if (newAge <= 0 || newAge >= 100) return age
//         return age = newAge
//     }

//     this.setFullName = function() {
//         const arr = newFullName.split(' ')
//         setName(arr[0])
//         setSurname(arr[1])
//         setfatherName(arr[2])
//     }

// }

// const a = new Person("Вася", "Пупкин")
// const b = new Person("Анна", "Иванова")
// const c = new Person("Елизавета", "Петрова")

// console.log(a.getName())

// console.log(a.getFullName()) //Вася Пупкин
// a.fatherName = 'Иванович'    //Вася Иванович Пупкин

// console.log(a.getFullName()) //Анна Иванова

// console.log(a)

//Person Prototype

function Person (name, surname) {
    let age
    let fatherName
    
    this.name = name
    this.surname = surname
    this.age = age
    this.fatherName = fatherName

}

Person.prototype.getName = function() {
    return this.name
}

Person.prototype.getSurname = function() {
    return this.surname
}

Person.prototype.getFatherName = function() {
    return this.fathername
}

Person.prototype.getAge = function() {
    return this.age
}

Person.prototype.getFullName = function() {
    return `${this.name} ${this.surname} ${this.fatherName || ''} ${this.age || ''}`
}

Person.prototype.setName = function(newName) {
    return this.name = newName
}

Person.prototype.setSurname = function(newSurname) {
    return this.surname = newSurname
}

Person.prototype.setAge = function(newAge) {
    return this.age = newAge
}

Person.prototype.setFatherName = function(newFathername) {
    return this.fatherName = newFathername
}

Person.prototype.setFullName = function(newFullName) {
    const arr = newFullName.split(' ')
    this.setName(arr[0]),
    this.setSurname(arr[1]),
    this.setFatherName(arr[2])
}

const a = new Person("Вася", "Пупкин")
const b = new Person("Анна", "Иванова")
const c = new Person("Елизавета", "Петрова")

console.log(a.getFullName()) //Вася Пупкин
a.fatherName = 'Иванович'    //Вася Иванович Пупкин

console.log(a.getFullName()) //Анна Иванова

//Store

function Store (reducer) {
    let state = reducer(undefined, {})
    let cbs = []

    this.getState = function() {
        return state
    }

    this.subscribe = function(cb) {
        cbs.push(cb) 
        return function (cbs) {
            cbs.filter(c => c !== cb)
        }
    }

    this.dispatch = function(action) {
        const newState = reducer(state, action)
        if (newState !== state) {
            state = newState
            for (let cb of cbs) cb()
        }
    }
}


//Password

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

// let p = new Password(document.body, true)



// p.onChange = data => console.log(data)
// p.onOpenChange = open => console.log(open)

// p.setValue('qwerty')
// console.log(p.getValue())

// p.setOpen(false)
// console.log(p.getOpen())

//LoginForm

function LoginForm (parent) {
    const container = document.createElement('div')
    parent.appendChild(container) 

    const login = document.createElement('input')
    login.type = 'text'
    container.appendChild(login)
    login.placeholder = 'Логин'

    let password = new Password(container, true)

    const button = document.createElement('button')
    container.appendChild(button)
    button.innerText = 'Войти'

    login.addEventListener('input', () => {
        if (login.value == '' || password.passwordInput.value == '') {
            button.disabled = true 
        }
        else button.disabled = false
    })

    password.onChange = function(value) {
 
    if (login.value == '' || password.passwordInput.value == '') {
            button.disabled = true 
    }
    else button.disabled = false}
}

const t = new LoginForm(document.body)

t.onChange = data => console.log(data)
console.log(t.onChange)

// //LoginForm Constructor

// function LoginFormConstruct (parent) {
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
//         password.onChange = value => {
//             login.addEventListener('input', () => {
//                 if (login.value === '') {
//                     button.disabled = true
//                 }
//             })
//             if(value == '') {
//                 button.disabled = true
//             }
            
//         }
//         if (login.value === '') {
//             button.disabled = true
//         }
//         else button.disabled = false

//     })

//     password.onChange = value => {
//         login.addEventListener('input', () => {
//             if (login.value === '') {
//                 button.disabled = true
//             }
//         })
//     if (login.value === '') {
//         button.disabled = true
//     }
//     else button.disabled = false}

//     this.getValue = function () {
//         return `${login.value} ${password.getValue()}`
//     }

//     this.setValue = function(loginValue, passwordValue) {
//         return login.value = loginValue, password.setValue(passwordValue)
//     }

//     this.passwordSetOpen = function(value) {
//         password.setOpen(value)
//     }

//    this.passwordGetOpen = function() {
//     password.getOpen()
//    }

// }

// const j = new LoginFormConstruct(document.body)

// j.setValue('gh', 'y')

// j.passwordSetOpen(true)

// j.passwordGetOpen()

//Password Verify 

// let psw1 = new Password(document.body, true)

// const psw2 = document.createElement('input')
// psw2.type = `text`
// psw2.placeholder = 'Повторите пароль'
// psw2.style.opacity = 0
// document.body.appendChild(psw2)


// psw1.onOpenChange = open => {
//     if(open === true) {
//         psw2.style.opacity = 0
//         psw2.type = 'text'
//     }
//     else {
//         psw2.style.opacity = 1
//         psw2.type = 'password'}
// }

// psw1.onChange = function(data) {
//     if (data !== psw2.value) {
//         this.passwordInput.style.border = '1px solid red'
//         psw2.style.border = '1px solid red'
//         console.log(data)
//         console.log(psw2.value)
//     }
//     else {
//         this.passwordInput.style.border = '1px solid black'
//         psw2.style.border = '1px solid black'
//     }
// }

// psw2.addEventListener('input', () => {
//     if (psw2.value !== psw1.passwordInput.value) {
//         psw1.passwordInput.style.border = '1px solid red'
//         psw2.style.border = '1px solid red'
//         console.log(psw2.value) 
//     }
//     else {
//         psw1.passwordInput.style.border = '1px solid black'
//         psw2.style.border = '1px solid black'
//     }
// })


