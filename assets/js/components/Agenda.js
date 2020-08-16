import React from 'react';
import moment from 'moment'
import { Button, Paper, Grid, IconButton, Typography, makeStyles, ButtonGroup } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { AGENDA_START, AGENDA_END } from '../services/config'


const setForbiddenPositions = (appointments) => {
    const forbiddenPositions = []
    appointments.map( ({schedule, duration}) => {
        for (let i = 0; i < duration; i++) {
            forbiddenPositions.push(moment(schedule).add((i * 15), 'm').format('HH:mm'))
        }
    }) 
    return forbiddenPositions
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
    quarters: {
        alignItems: 'center',
    }
}))

const Agenda = ({ date, appointments = [], onClick, onPrevious, onNext, door, schedule, duration }) => { 
    const classes = useStyles();

    const agenda = []
    const forbiddenPositions = setForbiddenPositions(appointments)
    const selection = setSelection (schedule, duration) 

    const handleClick = (date) => { 
        if(isPlaceEnough(date, duration, forbiddenPositions)) {
            onClick("schedule", date, false, door)
        }else {
            alert('pas assez de temps disponible sur cette plage')
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
                text: isForbidden ? "Occupé" : isSelected ? "Positionné" : time,   
                isForbidden,
                date
            })
        }
    }

    return ( 

        <Paper className={classes.paper}>
            <Grid container item xs={12} className={classes.cockpit}>
                <IconButton 
                    aria-label="before"
                    onClick={onPrevious}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography className={classes.title}>{date && date.format('Do MMMM YYYY')}</Typography>
                <IconButton 
                    aria-label="after"
                    onClick={onNext}>
                    <NavigateNextIcon />
                </IconButton> 
            </Grid>
            <Grid container>
                {agenda.map( (quarter, index) => (
                    <Grid  item xs={1} key={index}>
                        <Button
                            disabled={quarter.isForbidden} 
                            onClick={() => handleClick(quarter.date)}
                            >{ quarter.text }
                        </Button>
                    </Grid> 
                ))}
            </Grid> 
        </Paper>
        
     );
}
 
export default Agenda;