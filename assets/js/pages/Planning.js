import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, IconButton, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import PageWrap from '../components/ui/PageWrap';
import SimpleModal from '../components/ui/SimpleModal'

import { PLANNING_API } from '../services/config';
import Api from '../services/api'


import moment from 'moment'
import PlanningTable from '../components/PlanningTable';
moment.locale("fr")

const setRange = (date) => {
    return {
        monday: date.format('YYMMDD'),
        saturday: date.clone().add(5, 'days').format('YYMMDD')
    }
}

const Planning = () => {
    const [toast, setToast] = useState(false)
    const [modal, setModal] = useState({
        appointment: {},
        open: false
    });

    const [plannings, setPlannings] = useState([])
    const [dateInit, setDateInit] = useState(moment().weekday(0) )
    const {monday, saturday } = setRange(dateInit)

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

    const handleModal = (appointment) => {
        setModal({
            appointment,
            open: true
        })
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
                </Paper>

                <Grid container spacing={1}>
                    { plannings.map( planning =>
                        <Grid item xs={4} sm={2} key={planning.reference}> 
                            <PlanningTable 
                                onModal={handleModal}
                                appointments={planning.appointments}/> 
                        </Grid>
                    )}
                </Grid>
                <SimpleModal
                    open={modal.open}
                    onClose={ () => setModal({ ...modal, open:false }) }
                    content={ modal.appointment }
                />
                <Paper >
                    <div><pre>{JSON.stringify(plannings, null, 2)}</pre></div>
                </Paper>
            </Container>
        </PageWrap>     
     );
}
 
export default Planning;