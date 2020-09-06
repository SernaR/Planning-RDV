import React, { useRef, useState } from 'react';
import PageWrap from '../components/ui/PageWrap';
import { Container, TextField, Button, Paper } from '@material-ui/core';
import Api from '../services/api';
import { APPOINTMENT_API, STATUS } from '../services/config';
import SimpleAccordion from '../components/ui/SimpleAccordion';

const Homepage = ({history}) => {
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
    title="Homepage"
    message={message.current}
    open={toast}
    onClose={() => {
        message.current = ''
        setToast(false)}}
    >  
        <Container fixed>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Rendez-vous"
                    size='small'
                    //name="booking"
                    onChange={handleChange}
                    variant="outlined"
                />
                <Button type='submit'>rechercher</Button>
            </form>
            <SimpleAccordion 
                appointments={appointments}
                onCancel={handleCancel}
                onPostpone={handlePostpone}/>
            <Paper >
                <div><pre>{JSON.stringify(appointments, null, 2)}</pre></div>
            </Paper>
        </Container> 
    </PageWrap> 
}
 
export default Homepage;