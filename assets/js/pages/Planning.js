import React, { useState, useEffect, useCallback } from 'react';
import { Container, Paper, Grid, makeStyles } from '@material-ui/core';

import PageWrap from '../components/ui/PageWrap';
import Modal from '../components/ui/Modal'
import DateSwitchingHeader from '../components/ui/DateSwitchingHeader'

import { PLANNING_API, APPOINTMENT_API, STATUS, WEEK } from '../services/config';
import Api from '../services/api'

import moment from 'moment'
import PlanningTable from '../components/planning/PlanningTable';
import Aside from '../components/planning/Aside'
import Appointment from '../components/Appointment';
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
}))

const Planning = ({ history }) => {
    const classes= useStyles()
    const [toast, setToast] = useState(false)
    const [modal, setModal] = useState({
        appointment: {},
        open: false
    });

    const [plannings, setPlannings] = useState([])
    const [dateInit, setDateInit] = useState(moment().weekday(0) )
    const { monday, friday } = setRange(dateInit)
    const [type, setType] = useState("PA")

    useEffect(() => {
        fetchData()
    }, [dateInit])

    const fetchData = async () => {
        try {
            const plannings = await Api.findAll(`${PLANNING_API}?reference[gte]=${monday}&reference[lte]=${friday}&order[reference]=asc`)
            setPlannings(plannings)
        } catch(err) {
            setToast(true)
        }
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

    return ( 
        <PageWrap
            //loading={loading}
            title="Planning semaine "
            message=''//{message.current}
            open={toast}
            onClose={() => {
                //message.current = ''
                setToast(false)}}
        >  
            <Container>
                <Paper>
                    <DateSwitchingHeader 
                        date={dateInit}
                        onPrevious={ previous }
                        onNext={ next } />
                </Paper>
                <Grid container spacing={1} className={classes.agendas}>
                    <Grid item xs={4} sm={2}>
                        <Aside 
                            type={type}
                            onChangeType={ handleChangeType }/>
                    </Grid> 
                    { plannings.map( (planning, index) =>
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