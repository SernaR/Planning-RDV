import React from 'react';
import moment from 'moment'
import { Button, Paper, Grid, makeStyles } from '@material-ui/core';


import DateSwitchingHeader from '../ui/DateSwitchingHeader'
import { AGENDA_START, AGENDA_END } from '../../services/config'

const setForbiddenPositions = (appointments) => {
    const lastQuarter = moment(moment().startOf('day').toDate()).add((AGENDA_END * 15), 'm').format('HH:mm')
    const forbiddenPositions = [lastQuarter]
    const appointmentNumbers = {}

    appointments.map( ({number, schedule, duration}) => {
        for (let i = 0; i < duration; i++) {
            forbiddenPositions.push(moment(schedule).add((i * 15), 'm').format('HH:mm'))
            appointmentNumbers[moment(schedule).add((i * 15), 'm').format('HH:mm')] = number
        }
    }) 
    return {forbiddenPositions, appointmentNumbers}
}

const setSelection = (schedule, duration) => {
    if(!schedule) return []
    return expand (schedule, duration)
}

const isPlaceEnough = (date, duration, forbiddenPositions) => {
    const selection = expand (date, duration)
    return !selection.some( date => forbiddenPositions.includes(date))
}

const expand = (schedule, duration) => {
    const expanded = []
    for (let i = 0; i < duration; i++) {
        expanded.push(moment(schedule).add((i * 15), 'm').format('HH:mm'))
    }
    return expanded 
}

const useStyles = makeStyles(theme => ({
    cockpit: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    quarter_container: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(2),
    },

}))

const Agenda = ({ date, appointments = [], onClick, onPrevious, onNext, onAlert, door, schedule, duration }) => { 
    const classes = useStyles();

    const agenda = []
    const {forbiddenPositions, appointmentNumbers} = setForbiddenPositions(appointments)
    const selection = setSelection (schedule, duration) 
    
    const handleClick = ({ date, isForbidden }) => { 
        if(isForbidden){
            //do something
        }else {
            if(isPlaceEnough(date, duration, forbiddenPositions)) {
                onClick("schedule", date, false, door)
            }else {
                onAlert('pas assez de temps disponible sur cette plage')
            }
        }
    }

    if(date) {
        const now = moment(moment(date).startOf('day').toDate());

        for (let i = AGENDA_START; i < AGENDA_END; i++) {
            const date = now.clone().add((i * 15), 'm')
            const time = date.format('HH:mm')
            const isForbidden = forbiddenPositions.includes(time)
            const isSelected = selection.includes(time)
           
            agenda.push({
                text: isForbidden ? appointmentNumbers[time] : time, //isSelected ? "Positionné" : time,   
                isForbidden,
                date,
                color: isForbidden ? 'secondary' : 'primary', //isSelected ? 'primary' : 'default',
                variant: isSelected ? 'contained' : 'text' //isForbidden ? 'text' :'outlined'
            })
        }
    }

    return ( <>
        <Paper className={classes.paper}>
            <DateSwitchingHeader 
                date={date}
                onPrevious={onPrevious}
                onNext={onNext}/>
            <Grid container className={classes.quarter_container}>
                {agenda.map( (quarter, index) => (
                    <Grid item xs={1} key={index} >
                        <Button
                            onClick={() => handleClick(quarter)}
                            variant={quarter.variant}
                            color={quarter.color}
                            >{ quarter.text }
                        </Button>
                    </Grid> 
                ))}
            </Grid> 
        </Paper>
    </> );
}
 
export default Agenda;