import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'

import PageWrap from '../components/ui/PageWrap';
import BookingTable from '../components/booking/Table'
import Picker from '../components/form/DatePicker'

import Api from '../services/api'
import { BOOKING_API, PLANNING_API } from '../services/config'
import { Container, Grid, Paper, Button } from '@material-ui/core';
import Agenda from '../components/Agenda';

const AppointmentPage = (props) => {
    const [toast, setToast] = useState(false) 

    const [selectedDate, setSelectedDate] = useState(null)
    const [bookings, setBookings] = useState([])
    const [orders, setOrders] = useState([])
    const [appointment, setAppointment] = useState({})
    const [ planning, setPlanning ] = useState({})
    
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

    const handleChangeDate = (name, date, isSelected) => {
        setAppointment({ ...appointment, [name]: date })
        if (isSelected) setSelectedDate(date)  //et fonction appel à l'api//////////////////////
    }

    const toggleBooking = (id) => {
        const isNew = orders.indexOf(id) === -1
        const ordersids = isNew ? [ ...orders, id ] : orders.filter( orderId => orderId !== id)
        
        setOrders(ordersids)
    }

    const nextDay = () => {
        setSelectedDate(moment(selectedDate).add(1, 'days'))
        getPlanning()/////////////////test////////////////////////////////////
    }

    const previousDay = () => {
        setSelectedDate(moment(selectedDate).subtract(1, 'days'))
    }

    const getPlanning = async () => {
        try{
            const planning = await Api.create(PLANNING_API, planningReference())
            setPlanning(planning)
        }catch(err) {
            setToast(true)
        }
    }
    const planningReference = () => { 
        return { reference: selectedDate.format('YYYY') + '-' + selectedDate.dayOfYear() }
    }

    const handleSubmit = () => {
        const newAppointment = { ...appointment, orders }
        setAppointment(newAppointment)
        console.log('newAppointment:', newAppointment)
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