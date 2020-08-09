import React, { useState, useEffect } from 'react';
import PageWrap from '../components/ui/PageWrap';
import BookingTable from '../components/booking/Table'
import Picker from '../components/form/DatePicker'

import Api from '../services/api'
import { BOOKING_API } from '../services/config'
import { Container, Grid, Paper } from '@material-ui/core';

const AppointmentPage = (props) => {
    const [toast, setToast] = useState(false) 
    const [bookings, setBookings] = useState([])
    const [orders, setOrders] = useState([])
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

    const handleChangeDate = (name, date) => {
        setAppointment({ ...appointment, [name]: date })
    }

    const addBooking = (id) => {
        const isNew = orders.indexOf(id) === -1
        const ordersids = isNew ? [ ...orders, id ] : orders.filter( orderId => orderId !== id)
        
        setOrders(ordersids)
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
                    onClick={addBooking}/>
                <Picker 
                    label="Date demandée" 
                    onChange={handleChangeDate} 
                    name="askedDate" 
                    value={appointment.askedDate}/>
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
                    </Paper>
                </Grid>
            </Grid>
                
        </PageWrap>
    )     
     
}
 
export default AppointmentPage;