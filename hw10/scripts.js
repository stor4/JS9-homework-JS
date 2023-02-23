// // create person
// {
// function createPerson (name, surname, fathername) {
//     return {name: name, 
//         surname: surname,
//         fathername: fathername, 
//         getFullName () {
//             return `${this.name} ${this.surname} ${this.fathername || ''}`
//         }
// }}

// const h = createPerson('Andrey','Storchak')

// console.log(h.getFullName())
// }
//createPerson closure 

function createPersonClosure (name, surname) {
    let age
    let fathername
    
    function getName () {
        return name
    }

    function getSurname () {
        return surname
    }

    function getFatherName () {
        return `${fathername || 'Отчество неизвестно'}`
    }

    function getAge () {
        return `${age || 'Возраст не задан'}` 
    }

    function getFullName () {
        return `${name} ${surname} ${fathername || ''} ${age || ''}`
    }

    function setName (newName) {
        if (newName.charAt(0) === newName.charAt(0).toUpperCase()) name = newName
        else return name
        return newName
    }

    function setSurname (newSurname) {
        if (newSurname.charAt(0) === newSurname.charAt(0).toUpperCase()) surname = newSurname
        else return surname
        return newSurname
    }

    function setFatherName (newFatherName) {
        if (newFatherName.charAt(0) === newFatherName.charAt(0).toUpperCase()) fathername = newFatherName
        else return fathername
        return newFatherName
    }

    function setAge (newAge) {
        if (newAge <= 0 || newAge >= 100) return age
        return age = newAge
    }

    function setFullName (newFullName) {
        const arr = newFullName.split(' ')
        setName(arr[0])
        setSurname(arr[1])
        setFatherName(arr[2])
    }

    return {
        name,
        surname,
        age,
        fathername,
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName,
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName,
    }
}

const a = createPersonClosure("Вася", "Пупкин")
const b = createPersonClosure("Анна", "Иванова")
console.log(a.getFullName())
console.log(a.getAge())
a.setAge(15)
a.setAge(150) //не работает
console.log(a.getAge())
a.setName('Толик')
console.log(a.getFullName())


b.setFullName("Петрова Анна Николаевна")
console.log(b.getFullName()) //Николаевна

// //createPersonClosureDestruct
// {
    function createPersonClosureDestruct ({name, surname='Неизвестно', age='Неизвестно', fathername='Неизвестно'}) {
        // let age
        // let fathername
        
        function getName () {
            return name
        }
    
        function getSurname () {
            return surname
        }
    
        function getFatherName () {
            return `${fathername || 'Отчество неизвестно'}`
        }
    
        function getAge () {
            return `${age || 'Возраст не задан'}` 
        }
    
        function getFullName () {
            return `${name} ${surname} ${fathername || ''} ${age || ''}`
        }
    
        function setName (newName) {
            if (newName.charAt(0) === newName.charAt(0).toUpperCase()) name = newName
            else return name
            return newName
        }
    
        function setSurname (newSurname) {
            if (newSurname.charAt(0) === newSurname.charAt(0).toUpperCase()) surname = newSurname
            else return surname
            return newSurname
        }
    
        function setFatherName (newFatherName) {
            if (newFatherName.charAt(0) === newFatherName.charAt(0).toUpperCase()) fathername = newFatherName
            else return fathername
            return newFatherName
        }
    
        function setAge (newAge) {
            if (newAge <= 0 || newAge >= 100) return age
            return age = newAge
        }
    
        function setFullName (newFullName) {
            const arr = newFullName.split(' ')
            setName(arr[0])
            setSurname(arr[1])
            setFatherName(arr[2])
        }
    
        return {
            name,
            surname,
            age,
            fathername,
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName,
        }

        
    }
    const u = createPersonClosureDestruct({name: 'Николай', age: 75})
    console.log(u)

// const a = createPersonClosureDestruct(createPerson("Вася Пупкин"))
// const b = createPersonClosureDestruct({name: 'Николай', age: 75})
// console.log(a)
// }
// хЗ должно ли оно быть в таком виде

//isSorted 
// {
// function isSorted (...params) {
//     for (let i = 0; i < params.length; i++) {
//        if (typeof params[i] !== 'number' || params[i] <= params[i - 1]) {
//         return false}  
//     }
//     return true
// }
// let hg = [1,2,3,4,5,6]
// console.log(isSorted(...hg))

// //isSorted test

// const pushingArr = []
// let g

// while(g = prompt()) {
//     if (g === null || g === '') continue
//     pushingArr.push(Number(g))
    
// }
// console.log(pushingArr)
// console.log(isSorted(...pushingArr))

// }
// console.log(prompt())

//personForm
{
    const p = createPersonClosure("Анна", "Иванова")
    p.setAge(15)
    p.setFullName("Петрова Анна Николаевна")
    
    
    function personForm(parent, person){
        //насоздавать инпутов (5 штук)
        //надобавлять их в parent
        //навесить каждому из них обработчик события типа nameInput.oninput = () => {
            //тут пытаемся менять person используя person.setName. Текст в инпуте должен стать таким, который вернет setName
        //}
        const nameInput = document.createElement('input')
        const surnameInput = document.createElement('input')
        const fathernameInput = document.createElement('input')
        const ageInput = document.createElement('input')
        parent.appendChild(nameInput)
        parent.appendChild(surnameInput)
        parent.appendChild(fathernameInput)
        parent.appendChild(ageInput)
        nameInput.value = person.getName()
        surnameInput.value = person.getSurname()
        fathernameInput.value = `${person.getFatherName() || ''}`
        ageInput.value = `${person.getAge() || ''}`
        
        nameInput.oninput = () => {person.setName(nameInput.value)}
        surnameInput.oninput = () => {person.setSurname(surnameInput.value)}
        fathernameInput.oninput = () => {person.setFatherName(fathernameInput.value)}
        ageInput.oninput = () => {person.setAge(ageInput.value)}

        const btn = document.createElement('button')
        parent.appendChild(btn)
        btn.innerText = 'Полное имя'
        btn.onclick = () => {console.log(person.getFullName())}
    }

    personForm(container,p)
  

    
}
//getSetForm

function getSetForm () {}

