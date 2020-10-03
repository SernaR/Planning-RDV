import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";

import '../css/app.css';

import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import moment from "moment";
moment.locale("fr")

import Navbar from './components/ui/Navbar';
import Homepage from './pages/Homepage';
import Appointment from './pages/Appointment';
import Confirmation from './pages/Confirmation';
import Planning from './pages/Planning';

const App = () => {
    const NavbarWithRouter = withRouter(Navbar);

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <HashRouter>
                    <NavbarWithRouter />
                    <Switch>
                        <Route path="/rendez-vous/confirmation/:id" component={ Confirmation } />
                        <Route path="/rendez-vous/:id" component={ Appointment } />
                        <Route path="/planning" component={ Planning } />
                        <Route path="/" component={ Homepage } />
                    </Switch>  
                </ HashRouter>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

const rootElement = document.querySelector('#app')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
