// redux
function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb() //и запускаем подписчиков
        }
    }
    
    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

const store = createStore(reducer)



function reducer(state, {type, ШО, СКОКА, ДЕНЬГИ}){ //объект action деструктуризируется на три переменных
    let amount
    let value
    
    if (!state){ //начальная уборка в ларьке:
        return {
            пиво: {value: 50,
                   amount: 100,},
            сиги: {value: 80,
                   amount: 40,},
            сухарики: {value: 40,
                      amount: 30,}
        }
    }
     //МОЕ
    if (type === 'КУПИТЬ'){ //если тип action - КУПИТЬ, то:
        if(СКОКА === '' || ДЕНЬГИ === '') return state
        if (СКОКА > state[ШО].amount) {
            warning.innerHTML = 'У нас столько нет' 
            return state}
        if(ДЕНЬГИ < state[ШО].value * СКОКА) {
            warning.innerHTML = 'Не хватает денег!'
            return state}
        if(wallet.value < (state[ШО].value * СКОКА)) {
            warning.innerHTML = 'Это тебе не по карману'
            return state}
        warning.innerHTML = 'Спасибо за покупку!'
        wallet.value = wallet.value - (state[ШО].value * СКОКА)
        return {
            ...state, //берем все что было из ассортимента
            [ШО]: {
                value: state[ШО].value,
                amount: state[ШО].amount - Number(СКОКА),
            } //и уменьшаем то, что покупается на количество
            
        }
    }
    return state //если мы не поняли, что от нас просят в `action` - оставляем все как есть
}
// console.log(store.getState())

//Витрина

const beerAmount = document.createElement('span')
// beerAmount.innerText = store.getState().пиво
beer.appendChild(beerAmount)

const ciriAmount = document.createElement('span')
// ciriAmount.innerText = store.getState().сиги
ciri.appendChild(ciriAmount)

const cyxapukuAmount = document.createElement('span')
// cyxapukuAmount.innerText = store.getState().сухарики
cyxapuku.appendChild(cyxapukuAmount)

const unsubscribe = store.subscribe(() => {beerAmount.innerHTML = store.getState().пиво.amount,
                ciriAmount.innerText = store.getState().сиги.amount,
                cyxapukuAmount.innerText = store.getState().сухарики.amount,
                value1.innerText = store.getState().пиво.value,
                value2.innerText = store.getState().сиги.value,
                value3.innerText = store.getState().сухарики.value,
                text1.innerText=Object.keys(store.getState())[0],
                text2.innerText=Object.keys(store.getState())[1],
                text3.innerText=Object.keys(store.getState())[2]})

//Селект и опшны
const productSelect = document.createElement('select')
buttons.appendChild(productSelect)
productSelect.style = `
width: 65px;`

const option1 = document.createElement('option')
productSelect.appendChild(option1)
option1.innerText = Object.keys(store.getState())[0]

const option2 = document.createElement('option')
productSelect.appendChild(option2)
option2.innerText = Object.keys(store.getState())[1]

const option3 = document.createElement('option')
productSelect.appendChild(option3)
option3.innerText = Object.keys(store.getState())[2]

//Поле ввода

const input = document.createElement('input')
buttons.appendChild(input)
input.setAttribute('type', 'number');
input.setAttribute('placeholder', 'Кол-во')
input.style = `width: 50px`

//Кнопка

const btn = document.createElement('button')
buttons.appendChild(btn)
btn.innerText = 'Купить'

btn.onclick = () => {store.dispatch({type: 'КУПИТЬ', ШО: productSelect.value, СКОКА: input.value, ДЕНЬГИ: moneyInput.value})}

//Инпут денех

const moneyInput = document.createElement('input')
moneyInput.setAttribute('type', 'number')
moneyInput.setAttribute('placeholder', 'Деньги')
buttons.appendChild(moneyInput)
moneyInput.style = `width: 50px`

//Цены

const value1 = document.createElement('div')
const value2 = document.createElement('div')
const value3 = document.createElement('div')

showcase_value1.appendChild(value1)
showcase_value2.appendChild(value2)
showcase_value3.appendChild(value3)

//Всего своих денег

wallet.value = 867

const start = () => {store.dispatch({type: 'КУПИТЬ', ШО : 'пиво', СКОКА: 0, ДЕНЬГИ: 50}),
                     warning.innerText=''}
start()


