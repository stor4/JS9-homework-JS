const arr1 = ['Vasya', 'Petya', 'Alexey']
removeUser(arr1, 1)
console.log(arr1) /// ['Vasya', 'Alexey']

// function removeUser (array, number) {
//     let a = array.splice(number,1)
//     console.log(a)
// }

function removeUser (array, number) {
    for (let key in array) {
        if (key = number) {
            delete array[number]
        } 
    }
    tempArr = array.filter(Element => Element !== null)
    console.log(tempArr)
}

/////

const obj0 = { name: 'Vasya', age: 1}
getAllKeys(obj0) /// ["name", "age"]

// function getAllKeys (object) {
//     let tempObj = Object.keys(object)
//     console.log(tempObj)
// }

function getAllKeys (object) {
    let tempArr = []
    for (let key in object) {
        tempArr.push(key)    
    }
    console.log(tempArr)
}

/////

const obj1 = { name: 'Vasya', age: 1}
getAllValues(obj1) /// ["Vasya", 1]

// function getAllValues (object) {
//     let tempObj = Object.values(object)
//     console.log(tempObj)
// }

function getAllValues (object) {
    let tempArr = []
    for (let key in object) {
        tempArr.push(object[key])
    }
    console.log(tempArr)
}


/////

const obj = {
    id: 3,
    name: 'Vasya'
}

const secondObj = {
    id: 4,
    name: 'Katya'
}

const arr = [
    {
        id: 1,
        name: 'Kolya'
    },
    {
        id: 2,
        name: 'Petya'
    },
];

insertIntoarr(obj, 2)
console.log(arr) 
/// [ {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

insertIntoarr(secondObj, 1)
console.log(arr) 
/// [ {id: 4,name: 'Katya'}, {id: 1,name: 'Kolya'}, {id: 3, name: 'Vasya'}, {id: 2, name: 'Petya'} ]

function insertIntoarr (objectNumber, number) {
    arr.splice(number-1, 0, objectNumber)
}
