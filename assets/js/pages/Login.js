import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import PageWrap from '../components/ui/PageWrap';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = ({ history }) => {
    const classes = useStyles();
    const { setIsAuthenticated } = useContext(AuthContext);
    
    const [credentials, setCredentials] = useState({
        username: "Sirius",
        password: "mot2passe"
    })

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    }
  
    const handleSubmit = async event => {
        event.preventDefault();
        
        try{
            await authAPI.authenticate(credentials);
            setIsAuthenticated(true);
            setError('');
            history.replace("/planning");
        } catch(error) {
            setError("Utilisateur inconnu ou alors les informations ne correspondent pas")
        }
    }
    
    return <PageWrap title="Connexion à l'application">  
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={credentials.username} 
                        onChange={handleChange}
                        error={ error !== '' }
                        helperText={error}
                        fullWidth
                        label="Login"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={credentials.password}
                        onChange={handleChange}
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Se connecter
                    </Button>
                </form>
            </div> 
        </Container>
    </PageWrap>     
   
}

export default Login;
