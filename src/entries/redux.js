import { createStore } from 'redux'

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(form)
    const title = data.get('title')
    store.dispatch({
        type: 'ADD_SONG',
        payload: { title }
    });
    this.reset() // elimina el contenido del elemento que llamo este evento
}

//valores iniciales para mi estado, podría estar vacio, pero le estoy pasando un arreglo con objetos dentro
const initialState = [
    {
        title: 'Despacito'
    },
    {
        title: 'One more time'
    },
    {
        title: 'Echame la culpa'
    }
]

// reducer es necesario a la hora de crear el store de redux, y lo que hace por el momento, es regresarnos el estado
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return [...state, action.payload]
        default: return state
    }
}

//inicializamos el estado de nuestra aplicación, y como enhancer, preguntamos al navegador si tiene la extension de redux
const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


// aquí estamos creando elementos basandonos en el estado de redux
function render() {
    const container = document.getElementById("playlist")
    const playlist = store.getState()
    container.innerHTML = ''
    playlist.forEach(element => {
        const template = document.createElement('p')
        template.innerText = element.title;
        container.appendChild(template)
    });
}

render();

function handleChange() {
    render()
}

store.subscribe(handleChange);

// console.log(store.getState());