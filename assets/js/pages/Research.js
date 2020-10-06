import React, { useRef, useState } from 'react';
import PageWrap from '../components/ui/PageWrap';
import { Container, TextField, Button, makeStyles, Typography, Input } from '@material-ui/core';
import Api from '../services/api';
import { APPOINTMENT_API, STATUS } from '../services/config';
import SimpleAccordion from '../components/dahboard/SimpleAccordion';

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
      
    },
}))

const Research = ({history}) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [appointments, setAppointments] = useState([])

    const message = useRef('')
    const inputEl = useRef('')

    const handleCancel = async(id, index) => {
        try {
            await Api.update(APPOINTMENT_API, id, { status: STATUS.CANCEL, planning: null })
            appointments[index].status = STATUS.CANCEL

            message.current = "le Rdv a été annulé"
            setToast(true)
             
        } catch(err) {
            setToast(true)
        }
    }

    const handlePostpone = async(id) => {
        try {
            await Api.update(APPOINTMENT_API, id, { status: STATUS.POSTPONE, planning: null })
            history.push('/rendez-vous/'+ id)
        } catch(err) {
            setToast(true)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const search = inputEl.current.value
        if(!search) return
        
        setLoading(true)
        try {
            const appointments = await Api.findAll(APPOINTMENT_API + '?number=' + search) 
            setAppointments(appointments)
        } catch(err) {
            setToast(true)
        }
        setLoading(false)
    }

    const noResearchMatches = ( appointments.length === 0 && inputEl.current.value && !loading)
    
    return <PageWrap
    loading={loading}
    title="Recherche"
    message={message.current}
    open={toast}
    onClose={() => {
        message.current = ''
        setToast(false)}}
    >  
        <Container fixed>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    label="Rendez-vous"
                    size='small'
                    inputRef={inputEl}
                    variant="outlined"
                />
                <Button type='submit'>rechercher</Button>
            </form>
            { noResearchMatches &&
                <Typography variant="h6">Aucun rendez-vous ne correspond a la recherche</Typography>    
                ||
                <SimpleAccordion 
                    appointments={appointments}
                    onCancel={handleCancel}
                    onPostpone={handlePostpone}/>}
        </Container> 
    </PageWrap> 
}
 
export default Research;