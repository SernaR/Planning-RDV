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

const Agenda = ({ date, appointments = [], onClick, door, appointment }) => { //comment passer duration, door et schedule ??
    const agenda = []
    const forbiddenPositions = setForbiddenPositions(appointments)
    
    if( date) {
        const now = moment(moment(date).startOf('day').toDate());

        for (let i = AGENDA_START; i < AGENDA_END; i++) {
            const date = now.clone().add((i * 15), 'm')
            const time = date.format('HH:mm')
            const isForbidden = forbiddenPositions.includes(time)
           
            agenda.push({
                text: isForbidden ? "occuppé" : time, // ou  positionné
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
                        onClick={() => onClick("schedule", quarter.date, false)}
                        >{ quarter.text }
                    </Button>
                </li>
            ))}
        </ul> 
     );
}
 
export default Agenda;