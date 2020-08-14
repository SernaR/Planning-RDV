import React, { useState, useEffect } from 'react';
import moment from 'moment'

import PageWrap from '../components/ui/PageWrap';
import BookingTable from '../components/booking/Table'
import Picker from '../components/form/DatePicker'

import Api from '../services/api'
import { BOOKING_API, APPOINTMENT_API } from '../services/config'
import { Container, Grid, Paper, Button } from '@material-ui/core';
import Agenda from '../components/Agenda';
import useFetchPlanning from '../hooks/useFetchPlanning';
import useToggleBooking from '../hooks/useToggleBooking';

//faire sauter le RDV si modif qté

const AppointmentPage = () => {
    const [toast, setToast] = useState(false) 

    const [selectedDate, planning, getPlanning] = useFetchPlanning()
    const [duration, orders, toggleBooking] = useToggleBooking()
    
    const [bookings, setBookings] = useState([])
    const [appointment, setAppointment] = useState({})
    
    useEffect(() => {
        fetchBooking()
    },[])

    const fetchBooking = async() => {
        try {
            const bookings = await Api.findAll(BOOKING_API)
            setBookings(bookings)    
        }catch(err) {
            setToast(true)
        }
    }

    const scheduleCheck = (door) => {
        if( selectedDate && appointment.schedule ) {
            if( door === appointment.door && moment(selectedDate).format('D-M') === moment(appointment.schedule).format('D-M')) {
                return appointment.schedule
            }
        } 
    } 

    const handleChangeDate = (name, date, isSelected, door) => { 
        setAppointment({ ...appointment, [name]: date, door })
        if (isSelected) getPlanning(date)
    }

    const nextDay = () => {
        getPlanning(moment(selectedDate).add(1, 'days'))
    }

    const previousDay = () => {
        getPlanning(moment(selectedDate).subtract(1, 'days'))
    }

    const handleSubmit = async() => {
        //faire les vérifications
        const newAppointment = { ...appointment, 
            planning: planning['@id'],
            duration,
            orders,
            number: "string"
        }
       
        try {
            const result = await Api.create(APPOINTMENT_API, newAppointment)
            console.log('appointment:', result)
            //vider les states   
        }catch(err) {
            setToast(true)
        }
    }

    return (
        <PageWrap
            //loading={loading}
            title="Nouveau RDV"
            message=''//{message.current}
            open={toast}
            onClose={() => {
                //message.current = ''
                setToast(false)}}
        >  
            <Container>
                 <BookingTable 
                    items={bookings}
                    selected={orders}
                    onClick={toggleBooking}/>
                <Button onClick={previousDay}>Jour précédent</Button> 
                <Button onClick={nextDay}>Jour suivant</Button> 
                <form onSubmit={handleSubmit}>
                    <Picker 
                        label="Date demandée" 
                        onChange={handleChangeDate} 
                        name="askedDate" 
                        value={appointment.askedDate}/>
                    <Agenda 
                        schedule={scheduleCheck("PA1")}
                        duration={duration}
                        //schedule={appointment.schedule}
                        door="PA1"
                        appointments={planning.appointments}
                        date={ selectedDate } 
                        onClick={handleChangeDate}/>
                    <Button type="submit">Envoyer</Button>    
                </form>    
            </Container>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper >
                        <div><pre>{JSON.stringify(bookings, null, 2)}</pre></div>
                    </Paper>
                   
                </Grid>    
                <Grid item xs>    
                    <Paper >
                        <div><pre>{JSON.stringify(orders, null, 2)}</pre></div>
                    </Paper>
                </Grid>
                <Grid item xs>    
                    <Paper >
                        <div><pre>{JSON.stringify(appointment, null, 2)}</pre></div>
                        <div><pre>{JSON.stringify(selectedDate, null, 2)}</pre></div>
                        <div><pre>{JSON.stringify(planning, null, 2)}</pre></div>
                    </Paper>
                </Grid>
            </Grid>   
        </PageWrap>
    )     
     
}
 
export default AppointmentPage;