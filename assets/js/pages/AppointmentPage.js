import React, { useState, useEffect } from 'react';
import moment from 'moment'

import PageWrap from '../components/ui/PageWrap';
import BookingTable from '../components/booking/Table'
import Paginate from '../components/ui/Paginate';

import Api from '../services/api'
import { BOOKING_API, APPOINTMENT_API, DELIVERY_WINDOW } from '../services/config'
import { Container, Grid, Paper, Button } from '@material-ui/core';
import Agenda from '../components/Agenda';
import useFetchPlanning from '../hooks/useFetchPlanning';
import useToggleBooking from '../hooks/useToggleBooking';
import Filter from '../components/booking/Filter';

const STEP_1 = 1
const STEP_2 = 2
//mettre type article dans la config

const AppointmentPage = () => {
    const [toast, setToast] = useState(false) 
    const itemsPerPage = 10;

    const [selectedDate, planning, getPlanning] = useFetchPlanning()
    const [duration, orders, toggleBooking, removeAllBookings] = useToggleBooking()
    
    const [bookings, setBookings] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [appointment, setAppointment] = useState({})
    const [filters, setFilters] = useState({
        supplier: '',
        warehouse: 'PA'
    })

    const [step, setStep] = useState(STEP_1)
  
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
    } // faire swr

    const isSupplierDataFilled = () => { 
        return selectedDate && orders.length > 0
    }

    const isSchecduleFilled = () => {
        return appointment.schedule
    }
    const stepBack = () => {
        delete appointment.schedule
        setStep(step => step - 1)   
    }

    const scheduleCheck = (door) => {
        if( selectedDate && appointment.schedule ) {
            if( door === appointment.door && moment(selectedDate).format('D-M') === moment(appointment.schedule).format('D-M')) {
                return appointment.schedule
            }
        } 
    } 

    const filteredBookings = bookings.filter (booking => {
        return booking.supplier.toLowerCase().includes(filters.supplier.toLowerCase()) 
            && booking.warehouse.toLowerCase().includes(filters.warehouse.toLowerCase())
    })

    const paginatedCustomers = Paginate.getData(filteredBookings, currentPage, itemsPerPage);

    const appointmentsPerDoor = (door) => planning.appointments.filter( appointment => appointment.door === door)

    const handlePageChange = (page) => setCurrentPage(page);

    const handleChangeDate = (name, date, isSelected, door) => { 
        setAppointment({ ...appointment, [name]: date, door })
        if (isSelected) getPlanning(date)
    }

    const handleChangeWarehouse = ({target}) => {
        removeAllBookings()
        setCurrentPage(1);
        setFilters({...filters, [target.name]:target.value})
    }

    const handleChangeSupplier = ({target}) => {
        setFilters({...filters, [target.name]:target.value})
        setCurrentPage(1);
    }

    const nextDay = () => {
        if(selectedDate <= DELIVERY_WINDOW.max) getPlanning(moment(selectedDate).add(1, 'days'))
    }

    const previousDay = () => {
        if(selectedDate > appointment.askedDate) getPlanning(moment(selectedDate).subtract(1, 'days')) 
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        //faire les vérifications
        const newAppointment = { ...appointment, 
            planning: planning['@id'],
            duration,
            orders,
            number: `${planning.reference}-${planning.count + 1}`
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
                <form onSubmit={handleSubmit}>
                    <Filter
                        filters={filters} 
                        askedDate={appointment.askedDate} 
                        onChangeSupplier={handleChangeSupplier}
                        onChangeWarehouse={handleChangeWarehouse}
                        onChangeDate={handleChangeDate}
                    >
                        { isSupplierDataFilled() && <>
                        {step == STEP_1 && 
                            <Button color='primary' onClick={ () => setStep(step => step + 1) }>Suivant</Button>
                        || <>
                            <Button color='secondary' onClick={stepBack}>Précedent</Button>
                            { isSchecduleFilled() && <Button type="submit">Envoyer</Button>}
                        </>}    
                    </>}  
                    </Filter>

                    {step === STEP_1 && <>
                        <BookingTable 
                            items={paginatedCustomers}
                            selected={orders}
                            onClick={toggleBooking}/>
                         {itemsPerPage < filteredBookings.length &&<Paginate 
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={filteredBookings.length}
                            onPageChanged={handlePageChange}
                         />}</>    
                    ||    
                        <><Agenda  
                            schedule={scheduleCheck(filters.warehouse)}
                            duration={duration}
                            door={filters.warehouse}
                            appointments={appointmentsPerDoor(filters.warehouse)}
                            date={ selectedDate } 
                            onClick={handleChangeDate}
                            onPrevious={previousDay}
                            onNext={nextDay}/>
                        { filters.warehouse === 'PA' && 
                            <Agenda  
                                schedule={scheduleCheck("PA2")}
                                duration={duration}
                                door="PA2"
                                appointments={appointmentsPerDoor("PA2")}
                                date={ selectedDate } 
                                onClick={handleChangeDate}
                                onPrevious={previousDay}
                                onNext={nextDay}/>
                        }</>     
                    }
                    
                </form>    
            </Container>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper >
                        <div><pre>{JSON.stringify(filters, null, 2)}</pre></div>
                    </Paper>
                </Grid>    
                <Grid item xs>    
                    <Paper >
                        <div><pre>{JSON.stringify(orders, null, 2)}</pre></div>
                    </Paper>
                </Grid>
                <Grid item xs>    
                    <Paper >
                        <div><pre>{JSON.stringify(planning, null, 2)}</pre></div>
                    </Paper>
                </Grid>
            </Grid>   
        </PageWrap>
    )     
     
}
 
export default AppointmentPage;