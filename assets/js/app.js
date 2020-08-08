import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";

import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme'

import Navbar from './components/ui/Navbar';
import Homepage from './pages/Homepage';
import '../css/app.css';

const App = () => {
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <NavbarWithRouter />
                <Switch>
                    <Route path="/" component={ Homepage } />
                </Switch>  
            </ HashRouter>
        </ThemeProvider>
    )
}


const rootElement = document.querySelector('#app')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
