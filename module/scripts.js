//Каркас

function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        if (typeof action === 'function'){ //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb(state) //и запускаем подписчиков
        }
    }
    
    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

function combineReducers(reducers){
    function totalReducer(state={}, action){
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)){
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]){
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length){
            return {...state, ...newTotalState}
        }
        return state
    }

    return totalReducer
}

function jwtDecode(token) {
    if (token == ''|| token === undefined || token.includes('.') === false) {
        return
    }
    const splited = token.split('.')
    try {
        JSON.parse(atob(splited[1]))
    } 
    catch(error) {
        return
    } 
}

const reducers = {
    promise: promiseReducer, //допилить много имен для многих промисо
    auth: authReducer,     //часть предыдущего ДЗ
    //cart: cartReducer,     //часть предыдущего ДЗ
}

const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = ()    => ({type: 'AUTH_LOGOUT'})

function authReducer(state={}, {type, token}) {
    if (type === 'AUTH_LOGIN') {
        const payload = jwtDecode(token)
        console.log(payload)
        if (payload) {
            localStorage.authToken = token
            return {token, payload}
        }
    }
    if (type === 'AUTH_LOGOUT') {
        localStorage.removeItem('authToken')
        return {}
    }
    return state
   

}

const totalReducer = combineReducers(reducers) 
function promiseReducer(state={}, {type, status, payload, error, name}){
    if (type === 'PROMISE'){
        //имена добавить
        return {...state, [name]: {status, payload, error}}
    }
    return state
}
//имена добавить
const actionPending   = (name)      => ({name, type: 'PROMISE', status: 'PENDING'})
const actionFulfilled = (name, payload) => ({name, type: 'PROMISE', status: 'FULFILLED', payload})
const actionRejected  = (name, error)   => ({name, type: 'PROMISE', status: 'REJECTED',  error})

//имена добавить
const actionPromise = (name, promise) =>
    async dispatch => { 
        dispatch(actionPending(name)) //сигнализируем redux, что промис начался
        try{
            const payload = await promise //ожидаем промиса
            dispatch(actionFulfilled(name, payload)) //сигнализируем redux, что промис успешно выполнен
            return payload //в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
        }
        catch (error){
            dispatch(actionRejected(name, error)) //в случае ошибки - сигнализируем redux, что промис несложился
        }
    }




const store = createStore(totalReducer) //не забудьте combineReducers если он у вас уже есть
store.subscribe(() => console.log(store.getState()))

const drawCategory = (state) => {
    const [,route] = location.hash.split('/')
    if (route !== 'category') return

    const {status, payload, error} = store.getState().promise.OneCat || {};//.имя другое
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        
        const {name, goods, parent, subCategories} = payload
        main.innerHTML = `<h1>${name}</h1>
                         
                         <section style="color: ${subCategories}</section>
                         `
        for (const {_id, name, price, images} of goods){
            // const filmId = filmUrl.split('/films/')[1].slice(0,-1)
            main.innerHTML += `<a href="#/good/${_id}">
            <div style="display:flex; flex-direction: row; justify-content: space-around; align-items: center;">
            <h4 style="margin: 10px 0 10px 0;">${name}</h4>
            <br>
            </a><img src="http://shop-roles.node.ed.asmer.org.ua/${images[0].url}" style="height: 200px; width: 200px;">
            <h3>${price} тенге</h3>
            </div>`
        }
    }
}

store.subscribe(drawCategory)

store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'good') return

    const {status, payload, error} = store.getState().promise.OneGood || {}//.имя одно
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        const {name, price, description, images} = payload
        main.innerHTML = `<h1>${name}</h1>
                         <img src="http://shop-roles.node.ed.asmer.org.ua/${images[0].url}" style="height: 200px; width: 200px;">
                         <p>Цена: ${price}</p>
                         <p>${description}</p>
                         <input type='button'> 
                         `
        for (const _id of store.getState().promise.OneGood.payload){
            // const peopleId = peopleUrl.split('/people/')[1].slice(0,-1)
            main.innerHTML += `<a href="#/item/${_id}"></a>`
        }
    }
})

// store.subscribe(() => {  
//     const [,route] = location.hash.split('/')
//     if (route !== 'films') return

//     const {status, payload, error} = store.getState().promise//.имя одно
//     if (status === 'PENDING'){
//         main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
//     }
//     if (status === 'FULFILLED'){
//         const {title, opening_crawl, characters} = payload
//         main.innerHTML = `<h1>${title}</h1>
//                          <p>${opening_crawl}</p>
//                          `
//         for (const peopleUrl of characters){
//             const peopleId = peopleUrl.split('/people/')[1].slice(0,-1)
//             main.innerHTML += `<a href="#/people/${peopleId}">Герой №${peopleId}</a>`
//         }
//     }
// })





const actionGetPeople = id =>  //имя другое
    actionPromise('Oneman', fetch(`https://swapi.dev/api/people/${id}`).then(res => res.json()))

// const actionGetFilm = id => 
//     actionPromise(fetch(`https://swapi.dev/api/films/${id}`).then(res => res.json()))

const actionSomePeople = () => 
    actionPromise('somepeople', fetch(`https://swapi.dev/api/people/`).then(res => res.json()))

store.dispatch(actionSomePeople())

store.subscribe(() => {
    const {status, payload, error} = store.getState().promise.RootCats || {}//.имя третье
    if (status === 'FULFILLED' && payload){
        aside.innerHTML = ''
        
        for (const {_id, name} of payload){
            // const peopleId = peopleUrl.split('/people/')[1].slice(0,-1)
            aside.innerHTML += `<a href="#/category/${_id}"> ${name}</a>`
        }
    }
})

// window.onhashchange = () => {
//     const [,route, _id] = location.hash.split('/')

//     const routes = {
//         // people(){
//         //     console.log('People', _id)
//         //     store.dispatch(actionGetPeople(_id))
//         // },
//         // films(){
//         //     store.dispatch(actionGetFilm(_id))
//         // },
//         category() {
//             store.dispatch(actionCategoryById(_id))
//         },
//         good(){
//             //тут был store.dispatch goodById
//             store.dispatch(actionGoodById(_id))
//             console.log('good', _id)
//         },
//         login(){
//             console.log('А ТУТ ЩА ДОЛЖНА БЫТЬ ФОРМА ЛОГИНА')
//             //нарисовать форму логина, которая по нажатию кнопки Login делает store.dispatch(actionFullLogin(login, password))
//         },
//         //register(){
//             ////нарисовать форму регистрации, которая по нажатию кнопки Login делает store.dispatch(actionFullRegister(login, password))
//         //},
//     }

//     if (route in routes){
//         routes[route]()
//     }
// }

// window.onhashchange()





// Запросы

// # Запросы
// # Корневые категории(список)
// query rootCats($q:String){
//   CategoryFind(query:$q){
//     _id name parent{
//       _id name
//     }
//   }
// }

// # Получение одно категории с товарами и картинками
// query OneCat($q1:String){
//   CategoryFindOne(query:$q1){
//     _id name goods {_id, name, price, images{url}}
//     parent{_id name}
//     subCategories {_id name}
//   }
// }

// # Получение товара с описанием и картинками
// query oneGoods($q3:String){
//   GoodFindOne(query:$q3){
//     _id name price description images{url}
//   }
// }

// # Запрос на регистрацию
// mutation Reg($login:String, $password:String){
//   UserUpsert(user:{login:$login, password:$password}){
//     _id, login
//   }
// }

// # Запрос на логин
// query login($login:String, $password:String){
//   login(login:$login, password:$password)
// }

// # Запрос истории заказов
// query orderFind{
//   OrderFind(query:"[{}]"){
//     _id total orderGoods{good {_id, name}, total, price, count}
//   }
// }

// # Запрос на оформление заказа
// mutation newOrder{
//   OrderUpsert(order:{orderGoods:[{good:{_id: "64031b15d5e3301cba63a55f"}, count:2}]}) {
//     _id
//     createdAt
//     total
//   }
// }

// Вэрайблы для запросов

// {

//     "q":"[{\"parent\":null}]",
//     "q1":"[{\"_id\":\"6262ca7dbf8b206433f5b3d1\"}]",
//     "q3":"[{\"_id\":\"62d30938b74e1f5f2ec1a124\"}]",
//     "login": "stor4",
//     "password": "12345"
    
//}

// Ну и сами запросы

// async function getGql(query, variables={}) {
//     const url = "http://shop-roles.node.ed.asmer.org.ua/graphql"
//     let result
//     await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({query,
//                variables
//         })
//     }).then((res) => result = res.json())
//     console.log(result)
    
//     // try {
//     //     for(let i in result) {
//     //         console.log(i)
//     //         if(i == 'errors') {
//     //             throw new Error('Allo ebat')
                
//     //         }
            
//     // }
//     // catch (e){
//     //     return e
//     // }
   
    
//     // return result

    
// }




async function getGql(query, variables={}) {
    const url = "http://shop-roles.node.ed.asmer.org.ua/graphql"
    let result
    // let test
    try {const queryResult = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(localStorage.authToken?{authorization: `Bearer ` + localStorage.authToken} : {})
        },
        body: JSON.stringify({
          query,
          variables
        })
      })
      result = await queryResult.json()
      if (result.errors) {
        throw new Error('Wrong variable')
      }
      return Object.values(result.data)[0]
    } catch (error) {
      return error
    }
  }
// console.log(getGql(rootCats,))

function gql (url, query, variables) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({query,
               variables
        })
    }).then((res) => res.json())
}

// Запрос на список корневых категорий

const rootCats = `query rootCats($q:String){
    CategoryFind(query:$q){
      _id name parent{
        _id name
      }
    }
  }`
// const gqlRootCats = () => getGql(rootCats, {q: "[{\"parent\":null}]"})
// console.log(gqlRootCats())
// const actionRootCats = () => actionPromise('RootCats', gql("http://shop-roles.node.ed.asmer.org.ua/graphql", rootCats, {q: JSON.stringify([{parent:null}])}))
const actionRootCats = () => actionPromise('RootCats', getGql(rootCats, {q: JSON.stringify([{parent:null}])}))




store.dispatch(actionRootCats())

// ;(async () => console.log(await getGql(rootCats, {q: "[{\"parent\":null}]"})))()
// ;(async () => console.log(store.dispatch(await actionRootCats())))()

//Запрос для получения одной категории с товарами и картинками

const categoryFindOne = `query OneCat($q1:String){
    CategoryFindOne(query:$q1){
      _id name goods {_id, name, price, images{url}}
      parent{_id name}
      subCategories {_id name}
    }
  }`
// const gqlCategoryFindOne = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", categoryFindOne, {q1: "[{\"_id\":\"6262ca7dbf8b206433f5b3d1\"}]"})
// console.log(gqlCategoryFindOne())
// const actionCategoryById = (_id) => actionPromise('OneCat', gql("http://shop-roles.node.ed.asmer.org.ua/graphql", categoryFindOne, {q1: JSON.stringify([{_id}])}))
const actionCategoryById = (_id) => actionPromise('OneCat', getGql(categoryFindOne, {q1: JSON.stringify([{_id}])}))

// Запрос на получение товара с описанием и картинками

const oneGood = `query oneGoods($q3:String){
    GoodFindOne(query:$q3){
      _id name price description images{url}
    }
  }`
const gqlOneGood = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", oneGood, {q3: "[{\"_id\":\"62d30938b74e1f5f2ec1a124\"}]"})
// console.log(gqlOneGood())
// const actionGoodById = (_id) => actionPromise('OneGood', gql("http://shop-roles.node.ed.asmer.org.ua/graphql", oneGood, {q3: JSON.stringify([{_id}])}) )
const actionGoodById = (_id) => actionPromise('OneGood', getGql(oneGood, {q3: JSON.stringify([{_id}])}))

// Запрос на регистрацию

const userUpsert = `mutation Reg($login:String, $password:String){
    UserUpsert(user:{login:$login, password:$password}){
      _id, login
    }
  }`
const gqlUserUpsert = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", userUpsert, {login: "stor4", password: "12345"})
// console.log(gqlUserUpsert())

// Запрос на логин

const userLogin = `query login($login:String, $password:String){
    login(login:$login, password:$password)
}`
const gqlUserLogin = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", userLogin, {login: "stor4", password: "12345"})
// console.log(gqlUserLogin())

// Запрос истории заказов

const orderFind = `query orderFind{
    OrderFind($query:String){
      _id total orderGoods{good {_id, name}, total, price, count}
    }`
const gqlOrderFind = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", orderFind, {query: "[{}]"})
// console.log(gqlOrderFind())

// Запрос оформления заказа

// const orderUpsert = `mutation newOrder{
//     OrderUpsert(order:{orderGoods:[{good:{_id: "64031b15d5e3301cba63a55f"}, count:2}]}) {
//       _id
//       createdAt
//       total
//     }
//   }`
// const gqlOrderUpsert = () => gql("http://shop-roles.node.ed.asmer.org.ua/graphql", orderUpsert, {query: "[{}]"})

// debugger
console.log(store.getState())





window.onhashchange = () => {
    const [,route, _id] = location.hash.split('/')

    const routes = {
        // people(){
        //     console.log('People', _id)
        //     store.dispatch(actionGetPeople(_id))
        // },
        // films(){
        //     store.dispatch(actionGetFilm(_id))
        // },
        category() {
            store.dispatch(actionCategoryById(_id))
        },
        good(){
            //тут был store.dispatch goodById
            store.dispatch(actionGoodById(_id))
            console.log('good', _id)
        },
        login(){
            console.log('А ТУТ ЩА ДОЛЖНА БЫТЬ ФОРМА ЛОГИНА')
            //нарисовать форму логина, которая по нажатию кнопки Login делает store.dispatch(actionFullLogin(login, password))
        },
        //register(){
            ////нарисовать форму регистрации, которая по нажатию кнопки Login делает store.dispatch(actionFullRegister(login, password))
        //},
    }

    if (route in routes){
        routes[route]()
    }
}




// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2Mzc3ZTEzM2I3NGUxZjVmMmVjMWMxMjUiLCJsb2dpbiI6InRlc3Q1IiwiYWNsIjpbIjYzNzdlMTMzYjc0ZTFmNWYyZWMxYzEyNSIsInVzZXIiXX0sImlhdCI6MTY2ODgxMjQ1OH0.t1eQlRwkcP7v9JxUPMo3dcGKprH-uy8ujukNI7xE3A0"


// const store = createStore(authReducer)
store.subscribe(() => console.log(store.getState())) 

store.dispatch(actionAuthLogin(localStorage.authToken))
/*{
    token: "eyJhbGc.....", 
    payload: {
      "sub": {
        "id": "6377e133b74e1f5f2ec1c125",
        "login": "test5",
        "acl": [
          "6377e133b74e1f5f2ec1c125",
          "user"
        ]
      },
      "iat": 1668812458
    }
}*/
// store.dispatch(actionAuthLogout()) 








window.onhashchange()