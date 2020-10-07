import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";

import '../css/app.css';

import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import moment from "moment";
moment.locale("fr")

import Navbar from './components/navigation/Navbar';
import Homepage from './pages/Homepage';
import Appointment from './pages/Appointment';
import Confirmation from './pages/Confirmation';
import Planning from './pages/Planning';
import Research from './pages/Research';
import Login from './pages/Login';

import PrivateRoute from './components/navigation/PrivateRoute'
import authAPI from './services/authAPI'
import AuthContext from './contexts/AuthContext'

authAPI.setup()

const App = () => {
    const NavbarWithRouter = withRouter(Navbar);
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <AuthContext.Provider value ={{
                    isAuthenticated,
                    setIsAuthenticated
                }}>
                    <HashRouter>
                        <NavbarWithRouter />
                        <Switch>
                            <Route path="/connexion" component={ Login } />
                            <PrivateRoute path="/rendez-vous/confirmation/:id" component={ Confirmation } />
                            <PrivateRoute path="/rendez-vous/:id" component={ Appointment } />
                            <PrivateRoute path="/planning" component={ Planning } />
                            <PrivateRoute path="/recherche" component={ Research } /> 
                            <PrivateRoute path="/" component={ Homepage } /> 
                        </Switch>  
                    </ HashRouter>
                </AuthContext.Provider>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

const rootElement = document.querySelector('#app')
if(rootElement) {
    ReactDOM.render(<App />, rootElement)
}
