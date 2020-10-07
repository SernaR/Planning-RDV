import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Grid, makeStyles, Typography } from '@material-ui/core';

import PageWrap from '../components/ui/PageWrap';
import Modal from '../components/ui/Modal'
import DateSwitchingHeader from '../components/ui/DateSwitchingHeader'

import { PLANNING_API, APPOINTMENT_API, STATUS, WEEK } from '../services/config';
import Api from '../services/api'

import PlanningTable from '../components/planning/PlanningTable';
import Aside from '../components/planning/Aside'
import Appointment from '../components/Appointment';
import LoadingPage from '../components/ui/LoadingPage';

import moment from 'moment'
moment.locale("fr")

const setRange = (date) => {
    return {
        monday: date.format('YYMMDD'),
        friday: date.clone().add(4, 'days').format('YYMMDD')
    }
}

const useStyles = makeStyles(theme => ({
    agendas: {
        marginTop: theme.spacing(1),
    },
    empty: {
        textAlign: 'center',
        marginTop: 40
    }
}))

const Planning = ({ history }) => {
    const classes= useStyles()
    const [toast, setToast] = useState(false)
    const [modal, setModal] = useState({
        appointment: {},
        open: false
    });

    const [loading, setLoading] = useState({
        page: true,
        date: false
    })
    const [plannings, setPlannings] = useState([])
    const [dateInit, setDateInit] = useState(moment().weekday(0))
    const { monday, friday } = setRange(dateInit)
    const [type, setType] = useState("PA")

    useEffect(() => {
        fetchData()
    }, [dateInit])

    const fetchData = async () => {
        setLoading({
            ...loading,
            date: true
        })
        try {
            const plannings = await Api.findAll(`${PLANNING_API}?reference[gte]=${monday}&reference[lte]=${friday}&order[reference]=asc`)
            setPlannings(plannings)
        } catch(err) {
            setToast(true)
        }
        setLoading({
            page: false,
            date: false
        })
    }

    const next = () => {
        setDateInit(dateInit.clone().add(7, 'days'))
      }
    
    const previous = () => {
        setDateInit(dateInit.clone().subtract(7, 'days'))
    }

    const handleModal = useCallback((appointment, planningIndex) => {
        setModal({
            appointment,
            open: true,
            planningIndex
        })
    },[])

    const handleCancel = async() => {
        try {
            await Api.update(APPOINTMENT_API, modal.appointment.id, { status: STATUS.CANCEL, planning: null })

            const appointments = [...plannings[modal.planningIndex].appointments]
            plannings[modal.planningIndex].appointments = appointments.filter( appointment => appointment.id !== modal.appointment.id)

            setModal({ 
                appointment: {},
                open: false 
            })  
        } catch(err) {
            setToast(true)
        }
    }

    const handlePostpone = async() => {
        try {
            await Api.update(APPOINTMENT_API, modal.appointment.id, { status: STATUS.POSTPONE, planning: null })
            history.push('/rendez-vous/'+ modal.appointment.id)

        } catch(err) {
            setToast(true)
        }
    }

    const handleChangeType = ({target}) => {
        setType(target.value)
    }

    const noPlannings = plannings.length === 0

    if (loading.page) return <LoadingPage/>

    return ( 
        <PageWrap
            loading={loading.date}
            title={"Planning semaine "+ dateInit.format('w')}
            message=''
            open={toast}
            onClose={() => {
                setToast(false)}}
        >  
            <Container>
                <Paper>
                    <DateSwitchingHeader 
                        date={'Semaine du ' +  dateInit.format('DD/MM') + " au " + dateInit.clone().add(5, 'days').format('DD/MM/YYYY')}
                        onPrevious={ previous }
                        onNext={ next } />
                </Paper>
                <Grid container spacing={1} className={classes.agendas}>
                    <Grid item xs={4} sm={2}>
                        <Aside 
                            type={type}
                            onChangeType={ handleChangeType }/>
                    </Grid> 
                    { noPlannings &&
                        <Grid item xs={4} sm={8} className={classes.empty}>
                        <Typography variant="h6">Aucun Planning sur cette semaine</Typography></Grid>   
                    || 
                    plannings.map( (planning, index) =>
                        <Grid item xs={4} sm={2} key={index}> 
                            <PlanningTable 
                                day={WEEK[index]}
                                type={type}
                                planningIndex={index}
                                onModal={handleModal}
                                appointments={planning.appointments}/> 
                        </Grid>
                    )}
                </Grid>
                <Modal
                    open={modal.open}
                    onClose={ () => setModal({ ...modal, open:false }) }
                    onCancel={handleCancel}
                    onPostpone={handlePostpone}
                    title={`Rendez-vous n° ${modal.appointment.number}`}
                >
                    <Appointment content={modal.appointment}/>
                </Modal>
            </Container>
        </PageWrap>     
     );
}
 
export default Planning;