import React from 'react';
import { NavLink } from 'react-router-dom';

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

export default function Navbar() {
  const classes = useStyles();

  return (  
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
          <NavLink to="/" className={classes.menuButton}><Typography variant="h5" color="inherit" >Kip Creativ' </Typography></NavLink>  
        <div >
          <Button color="inherit"><NavLink to="/rendez-vous/nouveau" className={classes.menuButton}>Nouveau</NavLink></Button>
          <Button color="inherit"><NavLink to="/planning/consultation" className={classes.menuButton}>Planning</NavLink></Button>
          <Button color="inherit"><NavLink to="/liste/consultation" className={classes.menuButton}>Liste</NavLink></Button>
        </div>  
      </Toolbar>
    </AppBar>
  );
}

