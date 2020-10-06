import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import authAPI from '../../services/authAPI'
import AuthContext from '../../contexts/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    textDecoration: 'none',
    color: 'inherit',
  },
  toolbar: {
    justifyContent: 'space-around'
  },
}));

export default function Navbar({ history }) {
  const classes = useStyles();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    history.push("/connexion");
} 
 
  return (  
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
          <NavLink to="/" className={classes.menuButton}><Typography variant="h5" color="inherit" >Kip Creativ' </Typography></NavLink>  
        <div>
          { isAuthenticated && <>
            <Button color="inherit"><NavLink to="/rendez-vous/nouveau" className={classes.menuButton}>Nouveau</NavLink></Button>
            <Button color="inherit"><NavLink to="/planning" className={classes.menuButton}>Planning</NavLink></Button>
            <Button color="inherit"><NavLink to="/recherche" className={classes.menuButton}>Recherche</NavLink></Button>
            <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
          </> ||  
            <Button color="inherit"><NavLink to="/connexion" className={classes.menuButton}>Connexion</NavLink></Button>
          }  
        </div>  
      </Toolbar>
    </AppBar>
  );
}

