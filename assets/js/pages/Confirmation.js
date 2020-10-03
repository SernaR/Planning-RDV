import React, { useState, useEffect } from 'react';
import Api from '../services/api';
import {APPOINTMENT_API} from '../services/config'
import { Paper, Container, Button, makeStyles, Typography, Divider } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { Link } from 'react-router-dom';

import PageWrap from '../components/ui/PageWrap';
import Appointment from '../components/Appointment';

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(1),
    },
    link:{
        marginLeft: theme.spacing(1),
        textDecoration: 'none',
        color: 'inherit'
    }
}))

const Confirmation = ({match}) => {
    const classes = useStyles();

    const [appointment, setAppointment] = useState({})
    const [toast, setToast] = useState(false)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const appointment = await Api.find(APPOINTMENT_API, match.params.id)
            setAppointment(appointment)
        } catch(err) {
            setToast(true)
        }
    }
    
    return (
        <PageWrap
            //loading={loading}
            title="Confirmation"
            message=''//{message.current}
            open={toast}
            onClose={() => {
                //message.current = ''
                setToast(false)}}
        >  
            <Container>
                <Paper className={classes.container}>
                    <Typography variant="h5" component="h2" gutterBottom>Rendez-vous n° {appointment.number}</Typography>
                    <Divider />
                    <Appointment content={appointment} />
                </Paper>
                    <Button className={classes.button}>
                        <UpdateIcon />
                        <Link to='/rendez-vous/nouveau' className={classes.link}>Nouveau RDV</Link>
                    </Button>
            </Container>
        </PageWrap>     
     );
}
 
export default Confirmation;