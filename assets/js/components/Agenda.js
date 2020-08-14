import React from 'react';
import moment from 'moment'
import { Button } from '@material-ui/core';
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
    const selection = []
    for (let i = 0; i < duration; i++) {
        selection.push(moment(schedule).add((i * 15), 'm').format('HH:mm'))
    }
    return selection 
}

const isPlaceEnough = (date, duration, forbiddenPositions) => {
    const selection = []
    for (let i = 0; i < duration; i++) {
        selection.push(moment(date).add((i * 15), 'm').format('HH:mm'))
    }
    return !selection.some( date => forbiddenPositions.includes(date))
}

const Agenda = ({ date, appointments = [], onClick, door, schedule, duration }) => { 
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

    if( date) {
        const now = moment(moment(date).startOf('day').toDate());

        for (let i = AGENDA_START; i < AGENDA_END; i++) {
            const date = now.clone().add((i * 15), 'm')
            const time = date.format('HH:mm')
            const isForbidden = forbiddenPositions.includes(time)
            const isSelected = selection.includes(time)
           
            agenda.push({
                text: isForbidden ? "Occuppé" : isSelected ? "Positionné" : time,   
                isForbidden,
                date
            })
        }
    }

    return ( 
        <ul>
            {agenda.map( (quarter, index) => (
                <li key={index}>
                    <Button
                        disabled={quarter.isForbidden} 
                        onClick={() => handleClick(quarter.date)}
                        >{ quarter.text }
                    </Button>
                </li>
            ))}
        </ul> 
     );
}
 
export default Agenda;