import React, { useRef, useState } from 'react';
import PageWrap from '../components/ui/PageWrap';
import { Container, TextField, Button, makeStyles } from '@material-ui/core';
import Api from '../services/api';
import { APPOINTMENT_API, STATUS } from '../services/config';
import SimpleAccordion from '../components/dahboard/SimpleAccordion';

const useStyles = makeStyles(theme => ({
    form: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
      
    },
}))

const Homepage = ({history}) => {
    const classes = useStyles();

    const [search, setSearch] = useState('')
    const [toast, setToast] = useState(false)
    const [appointments, setAppointments] = useState([])

    const message = useRef('')

    const handleChange = ({target}) => {
        setSearch(target.value)
    }

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
       
        try {
            const appointments = await Api.findAll(APPOINTMENT_API + '?number=' + search) 
            setAppointments(appointments)
        } catch(err) {
            setToast(true)
        }
    }
    

    return <PageWrap
    //loading={loading}
    title="Bienvenue"
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
                    onChange={handleChange}
                    variant="outlined"
                />
                <Button type='submit'>rechercher</Button>
            </form>
            <SimpleAccordion 
                appointments={appointments}
                onCancel={handleCancel}
                onPostpone={handlePostpone}/>
        </Container> 
    </PageWrap> 
}
 
export default Homepage;