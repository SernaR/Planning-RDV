import React from 'react';
import PageWrap from '../components/ui/PageWrap';
import { Container, Typography } from '@material-ui/core';

const Homepage = () => {
    
    return (
        <PageWrap title="Bienvenue">  
            <Container fixed>
                <Typography variant='h5' style={{ marginTop: 20, marginBottom: 10}}>Evolutions à venir :</Typography>
                <Typography variant='h6'> - tableau de bord</Typography>
                <Typography variant='h6'> - plus de champs disponibles pour la recherche</Typography>
                <Typography variant='h6'> - interface d'administration, gestion des utilisateurs</Typography>
                <Typography variant='h6'> - accès fournisseurs</Typography>
                <Typography variant='h6'> - accès transitaires logistiques import </Typography>
            </Container> 
        </PageWrap> 
    )
}
 
export default Homepage;