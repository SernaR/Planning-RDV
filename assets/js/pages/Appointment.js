import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'

import PageWrap from '../components/ui/PageWrap';
import BookingTable from '../components/booking/Table'
import Paginate from '../components/ui/Paginate';

import Api from '../services/api'
import { BOOKING_API, APPOINTMENT_API, DELIVERY_WINDOW } from '../services/config'
import { Container, Grid, Paper, Button, makeStyles } from '@material-ui/core';
import RotateLeftTwoToneIcon from '@material-ui/icons/RotateLeftTwoTone';
import Agenda from '../components/agenda/Agenda';
import useFetchPlanning from '../hooks/useFetchPlanning';
import useToggleBooking from '../hooks/useToggleBooking';
import Filter from '../components/booking/Filter';
import LoadingPage from '../components/ui/LoadingPage';
import Header from '../components/agenda/Header';


const STEP_1 = 1
const STEP_2 = 2

const useStyles = makeStyles(theme => ({
    footer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}))

const Appointment = ({ history, match }) => {
    const classes = useStyles()

    const { id } = match.params;
    const [toast, setToast] = useState(false) 
    const message = useRef('')
    const itemsPerPage = 10;

    const [selectedDate, planning, loadingDate, getPlanning] = useFetchPlanning()
    const [totalQuantity, duration, orders, toggleBooking, toggleAllBookings, removeAllBookings] = useToggleBooking()
    
    const [loadingPage, setLoadingPage] = useState(true)

    const [bookings, setBookings] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [appointment, setAppointment] = useState({})
    const [filters, setFilters] = useState({
        supplier: '',
        booking: '',
        warehouse: 'PA'
    })

    const [step, setStep] = useState(STEP_1)
    
    useEffect(() => {
        if(id !== 'nouveau') {
            fetchPostponed()
        } else {
            fetchBooking()
        }
    },[id])

    const fetchBooking = async() => {
        try {
            const rangeBookings = await Api.findAll(
                BOOKING_API + 
                '?incotermDate[before]=' + 
                DELIVERY_WINDOW.max.format('YYYY-MM-DD') + 
                '&order[incotermDate]=asc'
            ) 
            const bookings = rangeBookings.filter( booking => booking.isFree === true)
            setBookings(bookings)    
            setLoadingPage(false)

        }catch(err) {
            setToast(true)
        }
    } 

    const fetchPostponed = async() => { 
        try{
            const postponed = await Api.find(APPOINTMENT_API, id)
           
            setStep(STEP_2)
            toggleAllBookings(postponed.orders)
            handleChangeDate('schedule', moment(postponed.schedule), true, postponed.door)
            setAppointment(appointment => ({ 
                ...appointment, 
                number: postponed.number,
                askedDate: moment(postponed.askedDate)
            }))
            fetchBooking()
        }catch(err) {
            setToast(true)
        }
    }
    
    const isSupplierDataFilled = () => { 
        return selectedDate && orders.length > 0
    }
    const isSchecduleFilled = () => {
        return appointment.schedule !== undefined
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
            && booking.booking.includes(filters.booking)
    }) 

    const paginatedOrders = Paginate.getData(filteredBookings, currentPage, itemsPerPage);

    const appointmentsPerDoor = (door) => planning.appointments.filter( appointment => appointment.door === door)

    const handlePageChange = (page) => setCurrentPage(page);

    const handleChangeDate = (name, date, isSelected, door) => { 
        setAppointment({ ...appointment, [name]: date, door })
        if (isSelected) getPlanning(date)
    }

    const handleChangeBooking = ({target}) => {
        setFilters({...filters, [target.name]:target.value})
        setCurrentPage(1);
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

    const handleAgendaAlert = text => {
        message.current = text
        setToast(true)
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
            number: appointment.number || `${planning.number}-${planning.count + 1}` 
        }
        
        try {
            const result = await Api.create(APPOINTMENT_API, newAppointment)
            history.push('/rendez-vous/confirmation/' + result.id)
        }catch(err) {
            setToast(true)
        }
    }

    if (loadingPage) return <LoadingPage/>
    
    return (
        <PageWrap
            loading={loadingDate}
            title="Nouveau RDV"
            message={message.current}
            open={toast}
            onClose={() => {
                message.current = ''
                setToast(false)}}
        >  
            <Container>
                <form onSubmit={handleSubmit}>
                    {step === STEP_1 && 
                        <Filter
                            filters={filters} 
                            askedDate={appointment.askedDate} 
                            onChangeSupplier={handleChangeSupplier}
                            onChangeBooking={handleChangeBooking}
                            onChangeWarehouse={handleChangeWarehouse}
                            onChangeDate={handleChangeDate}
                            onNext={ () => setStep(step => step + 1) }
                            isNext={isSupplierDataFilled()}>
                        </Filter> 
                    || 
                        <Header 
                            stepBack={stepBack}
                            totalQuantity={totalQuantity}
                            date={appointment.schedule}
                            isSchecduleFilled={isSchecduleFilled()}
                        />
                    }

                    {step === STEP_1 && <>
                        <BookingTable 
                            items={paginatedOrders}
                            selected={orders}
                            onSelectAll={() => toggleAllBookings(filteredBookings)}
                            onClick={toggleBooking}/>
                        <Grid container className={classes.footer}>
                            <Button size="small" onClick={removeAllBookings}><RotateLeftTwoToneIcon/> Réinitialiser</Button>    
                            {itemsPerPage < filteredBookings.length && <Paginate 
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                length={filteredBookings.length}
                                onPageChanged={handlePageChange}
                            />}
                        </Grid></>    
                    ||    
                        <Agenda  
                            schedule={scheduleCheck(filters.warehouse)}
                            duration={duration}
                            door={filters.warehouse}
                            appointments={appointmentsPerDoor(filters.warehouse)}
                            date={ selectedDate } 
                            onClick={handleChangeDate}
                            onAlert={handleAgendaAlert}
                            onPrevious={previousDay}
                            onNext={nextDay}/>
                    }
                </form>    
            </Container>
            
        </PageWrap>
    )     
     
}
 
export default Appointment;
