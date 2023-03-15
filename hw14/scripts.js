// HTML tree

const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
}
// document.write(htmlTree(table)) //вернет <table border='1' ....


function htmlTree(tree) {
    const { tagName, attrs = {}, children = [] } = tree;
    const attrStr = Object.entries(attrs).map(([key, value]) => `${key}='${value}'`).join(' ');
    const childStr = children.map(htmlTree).join('');
    return `<${tagName} ${attrStr}>${childStr}</${tagName}>`;
  }

// DOM Tree

function domTree(tree, parent) {
    const element = document.createElement(tree.tagName);
    if (tree.attrs) {
      Object.keys(tree.attrs).forEach(key => {
        element.setAttribute(key, tree.attrs[key]);
      });
    }
    if (tree.children) {
      tree.children.forEach(child => domTree(child, element));
    }
    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }
console.log(table.tagName)
domTree(table, document.body)

// Deep copy

function deepCopy(object) {
    if (typeof object !== 'object' || typeof object !== 'arr') {
        return object
    } else if (Array.isArray(object)) {
        return object.map((value) => deepCopy(value))
    } else if (typeof object === 'object') {
        let res = {}
        for (let i in object) {
            res[i] = deepCopy(object[i])
        }
        return res
    }
}

const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]
// const arr2 = deepCopy(arr) //arr2 и все его вложенные массивы и объекты - другие объекты, которые можно менять без риска поменять что-то в arr
// // const table2 = deepCopy(table) //аналогично

// console.log(arr2)

//My Stringify 

// const jsonString = stringify(arr) //напишите функцию stringify без использования JSON.stringify
// // console.log(JSON.parse(jsonString))
// console.log(jsonString)
//не должно поломаться и должно вернуть структуру, во всем схожую с оригинальным arr или table

function stringify (obj) {

    if (obj === undefined) {
        return 'undefined'
    } else if (obj === null) {
        return 'null'
    } else if (typeof obj === 'string') {
        return `${obj}`
    } else if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === null) {
        return String(obj)
    } else if (typeof obj === 'object' || Array.isArray(obj)) {
        const copy = deepCopy(obj)
        if (Array.isArray(copy)) {
            return `[${copy.map((value) => stringify(value)).join(',')}]`
        } else {
            const keys = Object.keys(copy)
            return `{${keys.map((key) => `"${key}":${stringify(copy[key])}`).join(',')}}`
        }
    }
    
}

// console.log(jsonString)

//getElemetById

// НЕ РАБОТАЕТ, но скоро будет

// function getElemetById(idToFind) {
//     function walker(parent=document.body, level=0){
//         let result
//         for (const child of parent.children){
//             result = ("    ".repeat(level) + child.tagName) //level используется для отступа
//             walker(child, level +1) //вложенный вызов - вложенный уровень вложенности :-D
//             return result
//         }
//     }
    
    
//     try {
//         let result
//         let obj = {}
//         obj.push(walker())
//         console.log(obj)
        
//     }
//     catch(error) {
//         console.log('Error', error.message)

//     }

// }
// // console.log(getElemetById('random'))

