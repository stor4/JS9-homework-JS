// Store class

class Store{
    #reducer;
    #state;
    #cbs = []
    
    constructor(reducer){
        this.#reducer = reducer
        this.#state = reducer(undefined, {})
    }
    
    getState(){
        return this.#state
    }
    
    subscribe(cb){
        this.#cbs.push(cb)
        return () => {
            this.#cbs = this.#cbs.filter((c) => c !== cb);
          };
    }
    
    dispatch(action){
        const newState = this.#reducer(this.#state, action)
        if (newState !== this.#state) {
            this.#state = newState
            for (let cb of this.#cbs) cb()
        } 
    }
}

// Password class

class Password{
    #checkbox
    #passwordInput
    #parent
    #open

    constructor(parent, open){
        this.#parent = parent
        this.#open = open
        

    this.#passwordInput = document.createElement('input')
    this.#passwordInput.setAttribute('type', 'password')
    this.#parent.appendChild(this.#passwordInput)
    // passwordValue = passwordInput.value
    this.#passwordInput.placeholder = 'Пароль'

    this.#checkbox = document.createElement('input')
    this.#checkbox.setAttribute('type', 'checkbox')
    this.#parent.appendChild(this.#checkbox)

    this.#passwordInput.type = open ? 'text' : 'password'
    this.#checkbox.checked = open

    this.#passwordInput.addEventListener('input', () => {
        if (this.onChange) {
          this.onChange(this.#passwordInput.value)
        }
      })
        
   this.#checkbox.addEventListener('change', () => {
       this.#passwordInput.type = this.#checkbox.checked ? 'text' : 'password'
        if (this.onOpenChange) {
            this.onOpenChange(this.#checkbox.checked)
        }
    })
    }
    get value(){
        return this.#passwordInput.value
    }
    set value(newValue){
        return this.#passwordInput.value = newValue
    }
    set openPSW(value) {
        if (value === true) {this.#passwordInput.setAttribute('type', 'text')}
        else if (value === false) {this.#passwordInput.setAttribute('type', 'password')}
    }
    onChange = function() {
        return this.#passwordInput.oninput = function() {
            return this.#passwordInput.value
        } 
    }

}

const test = new Password(document.body, open)

//StoreThunk Class

class StoreThunk extends Store {
    dispatch(action) {
        if (typeof action === 'function') {
            action(this.dispatch.bind(this), this.getState.bind(this))
        } else {
            super.dispatch(action)
        }
    }
}

//RGB Class

// class RGB {
//     #r
//     #g
//     #b

// }