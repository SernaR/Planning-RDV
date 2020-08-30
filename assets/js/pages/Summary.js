import React, { useState, useEffect } from 'react';
import Api from '../services/api';
import {APPOINTMENT_API} from '../services/config'
import { Paper, Container, Button } from '@material-ui/core';
import PageWrap from '../components/ui/PageWrap';
import { Link } from 'react-router-dom';

const Summary = ({match}) => {
    const [appointment, setAppointment] = useState()
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
                <Paper >
                    <div><pre>{JSON.stringify(appointment, null, 2)}</pre></div>
                    <Button><Link to='/rendez-vous/nouveau'>Nouveau RDV</Link></Button>
                </Paper>
            </Container>
        </PageWrap>     
     );
}
 
export default Summary;