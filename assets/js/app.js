import React from 'react';
import ReactDOM from 'react-dom';

import '../css/app.css';

console.log('Hello Webpack Encore! Edit me in assets/js/app.js')

const App = () => {
    return <h1>Hello world !</h1>
}


const rootElement = document.querySelector('#app')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
