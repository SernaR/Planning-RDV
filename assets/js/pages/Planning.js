import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, IconButton, Typography, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import PageWrap from '../components/ui/PageWrap';
import Modal from '../components/ui/Modal'

import { PLANNING_API, APPOINTMENT_API, STATUS } from '../services/config';
import Api from '../services/api'

import moment from 'moment'
import PlanningTable from '../components/PlanningTable';
import Appointment from '../components/Appointment';
moment.locale("fr")

const setRange = (date) => {
    return {
        monday: date.format('YYMMDD'),
        saturday: date.clone().add(5, 'days').format('YYMMDD')
    }
}

const Planning = ({ history }) => {
    const [toast, setToast] = useState(false)
    const [modal, setModal] = useState({
        appointment: {},
        open: false
    });

    const [plannings, setPlannings] = useState([])
    const [dateInit, setDateInit] = useState(moment().weekday(0) )
    const {monday, saturday } = setRange(dateInit)
    const [isOtherType, setOtherType] = useState(false)

    useEffect(() => {
        fetchData()
    }, [dateInit])

    const fetchData = async () => {
        try {
            const plannings = await Api.findAll(`${PLANNING_API}?reference[gte]=${monday}&reference[lte]=${saturday}`)
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

    const handleModal = (appointment, planningIndex) => {
        setModal({
            appointment,
            open: true,
            planningIndex
        })
    }

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
                    <Grid container item xs={12}>
                        <IconButton
                            aria-label="before"
                            onClick={previous}>
                            <NavigateBeforeIcon />
                        </IconButton>
                        <Typography>{monday}</Typography>
                        <IconButton 
                            aria-label="after"
                            onClick={next}>
                            <NavigateNextIcon />
                        </IconButton> 
                    </Grid>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch size="small" checked={isOtherType} onChange={() => setOtherType(!isOtherType)} />}
                            label="Autres Types"
                        />
                    </FormGroup>
                </Paper>

                <Grid container spacing={1}>
                    { plannings.map( (planning, index) =>
                        <Grid item xs={4} sm={2} key={index}> 
                            <PlanningTable 
                                isOtherType={isOtherType}
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
                <Paper >
                    <div><pre>{JSON.stringify(plannings, null, 2)}</pre></div>
                </Paper>
            </Container>
        </PageWrap>     
     );
}
 
export default Planning;